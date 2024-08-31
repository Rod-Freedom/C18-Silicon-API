import { connect, connection } from 'mongoose';

connect('mongodb://127.0.0.1:27017/SiliconAPI');

export default connection;