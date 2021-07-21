import { MongoClient, Collection } from 'mongodb'
export const MongoHelper = {
  uri: null as unknown as string,
  client: null as unknown as MongoClient,
  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  },
  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },
  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },
  map (mongoCollection: any): any {
    const { _id, ...collectiontWithoutId } = mongoCollection
    return Object.assign({}, collectiontWithoutId, { id: _id })
  }
}
