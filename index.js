const express = require('express')
const app = express()
const port = 3000;
const fetch = require('node-fetch')
var cors = require('cors')
app.use(cors())

app.get('/', (req, res) => { res.send(`<script>window.location.href = "https://github.com/Hello50511/lunch-api"</script>`) })

app.get('/school', (req, res) => {
    let schoolName = req.query.name;
    let url = 'https://open.neis.go.kr/hub/schoolInfo?Type=json&pIndex=1&pSize=100&SCHUL_NM=' + encodeURI(schoolName)

    fetch(url).then(res => res.json()).then(json => {
        let schools = []

        for (var i = 0; i < json['schoolInfo'][1]["row"].length; i++) {
            let schoolData = json['schoolInfo'][1]["row"][i];

            let jsonData = {
                regionCode: schoolData.ATPT_OFCDC_SC_CODE,
                schoolCode: schoolData.SD_SCHUL_CODE,
                schoolName: schoolData.SCHUL_NM,
                schoolWebsite: schoolData.HMPG_ADRES,
                schoolFax: schoolData.ORG_FAXNO,
                schoolAddress: schoolData.ORG_RDNMA,
            }

            schools.push(jsonData)
        }

        res.send(schools)

    })
})

app.get('/lunch', (req, res) => {
    let regionCode = req.query.region;
    let schoolCode = req.query.code;

    var today = new Date().toISOString().substring(0,10).replace(/-/g,'');
    let url = `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&pSize=100&ATPT_OFCDC_SC_CODE=${regionCode}&SD_SCHUL_CODE=${schoolCode}&MMEAL_SC_CODE=2&MLSV_YMD=${today}`

    fetch(url).then(res => res.json()).then(json => {
        console.log(json)
        let mealData = json.mealServiceDietInfo[1]['row'][0]['DDISH_NM']
        let ntr = json.mealServiceDietInfo[1]['row'][0]['NTR_INFO']
        let origin = json.mealServiceDietInfo[1]['row'][0]['ORPLC_INFO']
        let data = {
            mealData: mealData.split('<br/>'),
            ntrInfo: ntr.split('<br/>'),
            origin: origin.split('<br/>'),
            calories: json.mealServiceDietInfo[1]['row'][0]['CAL_INFO']
        }
        
        res.send(data)
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
