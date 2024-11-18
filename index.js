const express = require('express')
const app = express()
const port = 3000;
const fetch = require('node-fetch')
var cors = require('cors')
app.use(cors())

app.get('/', (req, res) => { res.send(`<script>window.location.href = "https://github.com/twl94/lunch-api"</script>`) })

app.get('/school', (req, res) => {
    let schoolName = req.query.name;
    let url = 'https://open.neis.go.kr/hub/schoolInfo?Type=json&pIndex=1&pSize=100&SCHUL_NM=' + encodeURI(schoolName)

    fetch(url).then(res => res.json()).then(json => {
        let schools = []

        if (!schoolName) return res.send({ error: "name 파라미터 값이 제공되지 않았습니다." })
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

    }).catch(e=> {
        res.send({error:e})

    })
})

app.get('/lunch', (req, res) => {
    let regionCode = req.query.region;
    let schoolCode = req.query.code;
    let date = req.query.date;

    if (!date) return res.send({ error: "date 파라미터 값이 제공되지 않았습니다." })
    if (!regionCode) return res.send({ error: "region 파라미터 값이 제공되지 않았습니다." })
    if (!schoolCode) return res.send({ error: "code 파라미터 값이 제공되지 않았습니다." })

    let url = `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&pSize=100&ATPT_OFCDC_SC_CODE=${regionCode}&SD_SCHUL_CODE=${schoolCode}&MMEAL_SC_CODE=2&MLSV_YMD=${date}`

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
    }).catch(er => {
        return res.send({ error: `급식 정보를 파싱중 예기치 못한 오류가 발생하였습니다. (${er})` })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
