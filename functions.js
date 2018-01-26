import axios from "axios"
import Promise, {coroutine} from "bluebird"
import Parser from "fast-html-parser"
import _ from "lodash"


export function getListek() {

    return new Promise((done, reject) => {
        coroutine(function* () {
            try {
                let data = yield axios.get("http://www.stara-hospoda.cz/")
                let parsed_data = yield  parseStaraHospoda(data.data)
                done(parsed_data)
            } catch (err) {
                done(err)
            }
        })()
    });
}

function parseStaraHospoda(data) {
    return new Promise((done) => {
        const parser = Parser.parse(data)

        const selector = parser.querySelector(".listek")
        let headers = selector.querySelectorAll("h2")
        let menus = selector.querySelectorAll("ul")

        const res = _.map(headers, (x, i) => {
            return {
                title: x.structuredText,
                body: menus[i].structuredText
            }
        })

        done(res)


    })
}