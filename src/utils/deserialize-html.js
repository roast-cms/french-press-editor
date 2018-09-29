import Html from "slate-html-serializer"

import {RULES_DESERIALIZE} from "../constants/rules-deserialize"

export const html = new Html({rules: RULES_DESERIALIZE})
