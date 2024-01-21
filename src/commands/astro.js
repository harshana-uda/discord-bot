const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const { fetchForecast } = require('../requests/forecast');

const data = new SlashCommandBuilder()
    .setName('astro')
    .setDescription('Replies with the astronomical information for the day!')
    .addStringOption((option)=> {
            option.setName('location')
            option.setDescription('The location can be a city, zip/postabl code, or lattitude and longitude.')
            option.setRequired(true);
            return option
        }
    );
  
async function execute(interaction) {

    await interaction.deferReply();

    const location = interaction.options.getString('location');

    try {
      
        const { locationName, weatherData } = await fetchForecast(location);
    
        const embed = new EmbedBuilder()
            .setColor(0x3f704d)
            .setTitle(`Astronomical forecast for ${locationName}`)
            .setTimestamp()
            .setFooter({
                text: 'Powerd by the weatherapi.com API'
            });
    
        for (const day of weatherData) {
            embed.addFields({
                name: day.date,
                value: `
                 🌄 Sunrise: ${day.sunriseTime}

                 🌇 Sunset: ${day.sunsetTime}

                 🌖 Moonrise: ${day.moonriseTime}

                 🌒 Moonset: ${day.moonsetTime}
                `
            });
        
        }
    
        await interaction.editReply({
            embeds: [embed]
        });

    } catch (error) {
        console.error(error);
        await interaction.editReply(error);
    }

  
    
}

module.exports = {
    data,
    execute
}
