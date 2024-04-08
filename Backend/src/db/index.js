const {Sequelize}=require("sequelize")

class DatabaseConnector{
    constructor(){
        this.PG_DB_URI=process.env.PG_DB_URI
        this.pgConn=new Sequelize(this.PG_DB_URI,{ logging: Boolean(0) })
        this.POSTGRES_RETRY_COUNT=0
        this.POSTGRES_RETRY_LIMIT=3
        this.RETRY_TIMEOUT=5*1000 //5 seconds
    }
    handleDBConnectionError( error) {
        if (this.POSTGRES_RETRY_COUNT < this.POSTGRES_RETRY_LIMIT) {
          console.error("Postgres connection error", error);
          this.POSTGRES_RETRY_COUNT += 1;
          setTimeout(() => {
            console.info("Retrying...");
            this.connectToPostgres();
          }, this.RETRY_TIMEOUT);
        } else {
          console.error("Postgres connection error", error);
          console.info("Retry Limit Exceeded. Terminating process");
          process.exit(0);
        }
}
    async connectToPostgres() {
    this.pgConn
      .sync({ alter: true })
      .then(() => console.log("Connected to Postgres"))
      .catch((error) => {
        this.handleDBConnectionError(error);
      });
    }
}

const db=new DatabaseConnector
module.exports=db