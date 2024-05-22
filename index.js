const aChecker = require("accessibility-checker")
const express = require('express')
const app = express()

app.get('/', function (req, res) {
    aChecker.getCompliance("https://programma.fdnd.nl", "FDND").then((results) => {
        const failed = [...new Set(results.report.results.map((item) => {
            if (item.level != 'pass') {
                return item.ruleId
            }
        }))];
        console.log(failed)

        const report = results.report.results.map((item)=>{
                const {ruleId, value, message, help} = item
                return { ruleId, value, message, help }
        });
    
        // console.log('POLICIES', results.report.summary.policies)
        //console.log('RAW RESULTS', results.report.results)
        console.log('REPORT', results.report)

        aChecker.getRuleset('WCAG_2_1').then(data => {
            for(let t = 0; t < data.checkpoints.length; t++){

                if(data.checkpoints[t].rules.length > 0){
                    // console.log(failed);

                    for(let i = 0; i < data.checkpoints[t].rules.length; i++){
                        // console.log(t, i)
                            if (failed.includes(data.checkpoints[t].rules[i].id)) {

                                const matchingItem = data.checkpoints[t].rules[i].id + data.checkpoints[t].num;
                                console.log(matchingItem)
                            }

                        // console.log(data.checkpoints[t].num,data.checkpoints[t].rules.length);

                    }
                }

            }

        })
    })
    
    // aChecker.getRuleset('WCAG_2_2').then(data => console.log(JSON.parse(data.checkpoints)))
    // aChecker.getRules('WCAG_2_2').then(data => console.log('First Rule', data[0]))
    // console.log('aChecker', aChecker)
})

app.listen(3001)

