with open('src/routes/profile.ts', 'r') as f:
    data = f.read()
# find get('/all') block and get('/:userId') block
all_start = data.find("/**\\n * @swagger\\n * /api/profile/all:")
userId_start = data.find("/**\\n * @swagger\\n * /api/profile/{userId}:")
all_end = data.find("/**\\n * @swagger\\n * /api/profile:", all_start)

all_block = data[all_start:all_end]
userId_block = data[userId_start:all_start]

data = data[:userId_start] + all_block + userId_block + data[all_end:]
with open('src/routes/profile.ts', 'w') as f:
    f.write(data)
