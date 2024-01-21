async function interactionCreateHandler(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
        console.log(`${interaction.user.username} used command ${interaction.commandName} at ${new Date().toLocaleString()}`)
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.defferd) {
            await interaction.followUp({
              content: 'There was an error while executing this command!',  
              ephemeral: true
            })
        } else {
            await interaction.reply({
                content: 'There was an error while executing this command!',  
                ephemeral: true
            })
        }
    }
}


module.exports = {
    interactionCreateHandler
}