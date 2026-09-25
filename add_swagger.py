import os
import re

routes_dir = 'src/routes'
for filename in os.listdir(routes_dir):
    if not filename.endswith('.ts') or filename == 'profile.ts':
        continue
    filepath = os.path.join(routes_dir, filename)
    with open(filepath, 'r') as f:
        content = f.read()

    if '@swagger' in content:
        continue

    # Regex to find router methods
    pattern = r"([a-zA-Z0-9_]+Router)\.(get|post|put|delete)\('([^']+)',"
    
    def replacer(match):
        router_name = match.group(1)
        method = match.group(2)
        path = match.group(3)
        prefix = filename.replace('.ts', '')
        
        openapi_path = re.sub(r':([a-zA-Z0-9_]+)', r'{\1}', path)
        if openapi_path == '/':
            openapi_path = ''
        
        full_path = f"/api/{prefix}{openapi_path}"
        
        # Extract path parameters for swagger
        path_params = re.findall(r'{([^}]+)}', openapi_path)
        params_yaml = ""
        if path_params:
            params_yaml = " *     parameters:\n"
            for p in path_params:
                params_yaml += f" *       - in: path\n *         name: {p}\n *         required: true\n *         schema:\n *           type: string\n"

        request_body_yaml = ""
        if method in ['post', 'put']:
            request_body_yaml = """ *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
"""

        swagger = f"""/**
 * @swagger
 * {full_path}:
 *   {method}:
 *     summary: Endpoint for {prefix}
 *     tags: [{prefix.capitalize()}]
{params_yaml}{request_body_yaml} *     responses:
 *       200:
 *         description: Successful response
 */
"""
        return swagger + match.group(0)

    new_content = re.sub(pattern, replacer, content)
    with open(filepath, 'w') as f:
        f.write(new_content)
print("Swagger docs injected!")
