import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
    region: 'eu-west-1',
    accessKeyId: 'your-access-key-id',
    secretAccessKey: 'your-secret-access-key'
});

// Create DynamoDB service object
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Example CRUD operations

// Create (Put Item)
const putParams = {
    TableName: 'Rooms',
    Item: {
        'RoomID': 'value',
        'Attribute1': 'value1',
        'Attribute2': 'value2'
    }
};

dynamoDB.put(putParams, (err, data) => {
    if (err) {
        console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Added item:', JSON.stringify(data, null, 2));
    }
});

// Read (Get Item)
const getParams = {
    TableName: 'Lectures',
    Key: {
        'PrimaryKey': 'value'
    }
};

dynamoDB.get(getParams, (err, data) => {
    if (err) {
        console.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('GetItem succeeded:', JSON.stringify(data, null, 2));
    }
});

// Update (Update Item)
const updateParams = {
    TableName: 'your-table-name',
    Key: {
        'PrimaryKey': 'value'
    },
    UpdateExpression: 'set Attribute1 = :val1',
    ExpressionAttributeValues: {
        ':val1': 'newValue1'
    },
    ReturnValues: 'UPDATED_NEW'
};

dynamoDB.update(updateParams, (err, data) => {
    if (err) {
        console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
    }
});

// Delete (Delete Item)
const deleteParams = {
    TableName: 'your-table-name',
    Key: {
        'PrimaryKey': 'value'
    }
};

dynamoDB.delete(deleteParams, (err, data) => {
    if (err) {
        console.error('Unable to delete item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('DeleteItem succeeded:', JSON.stringify(data, null, 2));
    }
}
}
