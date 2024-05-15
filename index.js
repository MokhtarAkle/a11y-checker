const aChecker = require("accessibility-checker")
const express = require('express')
const app = express()

app.get('/', function (req, res) {
    aChecker.getCompliance("https://gvb.nl", "GVB").then((results) => {
        const failed = results.report.results.map((item)=>{
            if (item.value.includes('FAIL')) {
                return item
            }
        });
    
        const report = results.report.results.map((item)=>{
                const {ruleId, value, message, help} = item
                return { ruleId, value, message, help }
        });
    
        // console.log('POLICIES', results.report.summary.policies)
        //console.log('RAW RESULTS', results.report.results)
        console.log('REPORT', results.report.summary)

        aChecker.getRuleset('WCAG_2_2').then(data => {
            console.log(data.checkpoints[0].rules)
        })
    })
    
    // aChecker.getRuleset('WCAG_2_2').then(data => console.log(JSON.parse(data.checkpoints)))
    // aChecker.getRules('WCAG_2_2').then(data => console.log('First Rule', data[0]))
    // console.log('aChecker', aChecker)
})

app.listen(3001)

