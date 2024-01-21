const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const { fetchForecast } = require('../requests/forecast');

const data = new SlashCommandBuilder()
    .setName('forecast')
    .setDescription('Replies with the weather forecast!')
    .addStringOption((option)=> {
            option.setName('location')
            option.setDescription('The location can be a city, zip/postabl code, or lattitude and longitude.')
            option.setRequired(true);
            return option
        }
    )
    .addStringOption((option)=> {
        option.setName('unit')
        option.setDescription('The unit system of the result: either "metric" or "imperial".')
        option.addChoices({name: 'Metric', value: 'metric'}, { name: 'Imperial', value: 'imperial'})
        option.setRequired(false);
        return option
    }
)

async function execute(interaction) {

    await interaction.deferReply();

    const location = interaction.options.getString('location');
    const unit = interaction.options.getString('unit') || 'metric';
    const isMetric = unit == 'metric';

    try {
      
        const { locationName, weatherData } = await fetchForecast(location);
        console.log('Weather Data', weatherData)

        const embed = new EmbedBuilder()
            .setColor(0x3f704d)
            .setTitle(`Weather forecast for ${locationName}`)
            .setDescription(`Using the ${unit} system.`)
            .setTimestamp()
            .setFooter({
                text: 'Powerd by the weatherapi.com API'
            });
    
        for (const day of weatherData) {
            const temperatureMin = isMetric ? day.temperatureMinC : day.temperatureMinF;
            const temperatureMax = isMetric ? day.temperatureMaxC : data.temperatureMaxF;
            
            embed.addFields({
                name: day.date,
                value: `⬇️ Low: ${temperatureMin} °C,  ⬆️ High: ${temperatureMax} °C`
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