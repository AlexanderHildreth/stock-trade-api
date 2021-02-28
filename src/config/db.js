// Modules
const sqlite3 = require('sqlite3')
const sqlite  = require('sqlite')

async function createDbConn (app) {
  app.set('db', await sqlite.open({
    filename: ':memory:',
    driver: sqlite3.Database
  }))
  
  const DbConn = app.get('db')

  DbConn.run(
    `CREATE TABLE IF NOT EXISTS trades (
      id int primary key,
      type text,
      user_id int,
      user_name text,
      symbol text,
      shares int,
      price real,
      timestamp datetime
    );`,
  () => {
    DbConn.run(`CREATE INDEX IF NOT EXISTS unique_trade ON trades (id)`);
    DbConn.run(`CREATE INDEX IF NOT EXISTS symbol_index ON trades (symbol)`);
    DbConn.run(`CREATE INDEX IF NOT EXISTS price_index ON trades (price)`);
    DbConn.run(`CREATE INDEX IF NOT EXISTS time_index ON trades (timestamp)`);
    DbConn.run(`CREATE INDEX IF NOT EXISTS user_index ON trades (user_id)`);
    DbConn.run(`CREATE INDEX IF NOT EXISTS type_index ON trades (type)`);
  })
}

module.exports.createDbConn = createDbConn
