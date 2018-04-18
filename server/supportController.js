module.exports = {
    supportTicket: (req, res) => {
        // send email to ourselves here with support ticket details
        return res.status(200).send('ok');
      }
}