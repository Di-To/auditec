// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/auditec.sqlite3'
    },
    useNullAsDefault: true
  },
}