const https = require('https')
const got = require('got')


async function findDrug(drug){
  let query = "proprietary_name:"+drug
  let res
  try{
    res = await got("https://api.fda.gov/other/nsde.json?api_key=IbMkYkBOkuTRvQZDaXgfjxYP2wzDtySmg8477KvA&search="+query,{
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
  findDrug
}
