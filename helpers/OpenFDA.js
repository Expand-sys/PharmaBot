const https = require('https')
const got = require('got')
const apikey= process.env.APIKEY

async function findDrug(drug){
  let query = "proprietary_name:"+drug
  let res
  try{
    res = await got("https://api.fda.gov/other/nsde.json?api_key="+apikey+"&search="+query,{
  	   dnsLookupIpVersion: 'ipv4'
    });
    res = res.body
    res = JSON.parse(res)
  } catch(err){
  console.log(err)
  res = 'Couldnt find the Medicine Specified'
  }
  return res
}
async function adverseEvent(drug){
  //https://api.fda.gov/other/event.json?search=patient.drug.activesubstance.activesubstancename:Prozac
  let query = "patient.drug.medicinalproduct:"+drug
  let res
  try{
    res = await got("https://api.fda.gov/drug/event.json?api_key="+apikey+"&search="+query,{
  	   dnsLookupIpVersion: 'ipv4'
    });
    res = res.body
    res = JSON.parse(res)
  } catch(err){
  console.log(err)
  res = 'Couldnt find the Medicine Specified'
  }
  return res
}

module.exports = {
  findDrug,
  adverseEvent
}
