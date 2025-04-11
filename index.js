const venom = require('venom-bot');

let banidos = [];

venom
  .create({
    headless: true,
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    logQR: true
  })
  .then((client) => start(client))
  .catch((error) => {
    console.log("Erro ao iniciar o bot:", error);
  });

function start(client) {
  client.onMessage((message) => {
    const texto = message.body.toLowerCase();
    const remetente = message.sender.id;

    // Verifica se está banido
    if (banidos.includes(remetente)) return;

    if (texto.startsWith('/paixao')) {
      const nivel = Math.floor(Math.random() * 101);
      client.sendText(message.from, `💘 Essa pessoa está ${nivel}% apaixonada por você!`);
    }

    else if (texto.startsWith('/ban')) {
      banidos.push(remetente);
      client.sendText(message.from, `🚫 Você foi banido de usar este bot.`);
    }

    else if (texto.startsWith('/ajuda')) {
      client.sendText(message.from, `📋 Comandos disponíveis:\n/paixao\n/ban\n/ajuda`);
    }
  });
}
