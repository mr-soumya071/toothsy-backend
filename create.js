import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "appointment",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      appointmentId: uuid.v1(),
      name:data.name,
      email:data.email,
      date: data.date,
    }
  };

  await dynamoDb.put(params);

  return params.Item;
});