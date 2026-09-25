import * as building from "../../data/model/building.js"
import * as classTable from "../../data/model/class.js"
import * as friendship from "../../data/model/friendship.js"
import * as guild from "../../data/model/guild.js"
import * as island from "../../data/model/island.js"
import * as option from "../../data/model/option.js"
import * as topic from "../../data/model/topic.js"
import * as question from "../../data/model/question.js"
import * as shop from "../../data/model/shop.js"
import * as subject from "../../data/model/subject.js"
import * as subtopic from "../../data/model/subtopic.js"
import * as user from "../../data/model/user.js"

export const schema = {
    ...user,
    ...subject,
    ...subtopic,
    ...topic,
    ...building,
    ...classTable,
    ...friendship,
    ...guild,
    ...island,
    ...option,
    ...question,
    ...shop,
}

export * from "../../data/model/building.js"
export * from "../../data/model/class.js"
export * from "../../data/model/friendship.js"
export * from "../../data/model/guild.js"
export * from "../../data/model/island.js"
export * from "../../data/model/option.js"
export * from "../../data/model/topic.js"
export * from "../../data/model/question.js"
export * from "../../data/model/shop.js"
export * from "../../data/model/subject.js"
export * from "../../data/model/subtopic.js"
export * from "../../data/model/user.js"