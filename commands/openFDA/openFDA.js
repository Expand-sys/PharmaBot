const Discord = require('discord.js');
const { findDrug } = require('../../helpers/OpenFDA')


module.exports = {
	name: 'openfda',
	aliases: ['openFDA'],
	description: 'fids drug based on proprietary name',
	async execute(message, args) {
		if(args[0] == "find" || args[0] == "Find"){
			let res = await findDrug(args[1])
			if(res == 'Couldnt find the Medicine Specified'){
				message.reply(res)
			}else{
				const embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Name: '+res.results[0].proprietary_name)
				.addFields(
					{ name:"application_number_or_citation", value: res.results[0].application_number_or_citation},
		      {name:"product_type", value: res.results[0].product_type},
		      {name:"marketing_start_date", value: res.results[0].marketing_start_date},
		      {name:"package_ndc", value: res.results[0].package_ndc},
		      {name:"inactivation_date", value: res.results[0].inactivation_date},
		      {name:"marketing_category", value: res.results[0].marketing_category},
		      {name:"billing_unit", value: res.results[0].billing_unit},
		      {name:"package_ndc11", value: res.results[0].package_ndc11},
		      {name:"dosage_form", value: res.results[0].dosage_form },
				)
				.setFooter('heh nice');
				message.reply(embed)
			}
		}

	},
};
