import { MongoClient, ServerApiVersion, Db, Collection } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@tweetprojectk18f2.hzd7pgx.mongodb.net/?retryWrites=true&w=majority`
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      // kết nối mình với server mongo	(optional từ phiên bản 4.7 nên mình xóa đi cũng oke)
      // await client.connect()
      // gữi tính hiệu kết nối lên server
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
      throw error
    } // finally {
    // Ensures that the client will close when you finish/error
    //await this.client.close()
    //} // k dùng finally vì như vậy sau khi kết nối nó sẽ đóng lại luôn,
    //và mình sẽ k thể gữi request đc nữa
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }

  get refreshToken(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string)
  }
}
const databaseService = new DatabaseService()
export default databaseService
