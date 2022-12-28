import * as functions from "firebase-functions";
import { TwitterApi } from "twitter-api-v2";

const getJPDayText = (weekNumber) => {
  if (weekNumber == 0) {
    return "日";
  } else if (weekNumber == 1) {
    return "月";
  } else if (weekNumber == 2) {
    return "火";
  } else if (weekNumber == 3) {
    return "水";
  } else if (weekNumber == 4) {
    return "木";
  } else if (weekNumber == 5) {
    return "金";
  } else if (weekNumber == 6) {
    return "土";
  }
};

const getkashiText = (weekNumber) => {
  if (weekNumber == 0) {
    return "休日だぞい！";
  } else if (weekNumber == 1) {
    return "月曜日ちゃんと出勤！　皆で乗り切ろう！";
  } else if (weekNumber == 2) {
    return "火曜日には調子出ます！　ホンマなんです〜！";
  } else if (weekNumber == 3) {
    return "水曜日もっと集中！";
  } else if (weekNumber == 4) {
    return "木曜日もう夢中！";
  } else if (weekNumber == 5) {
    return "やる気　元気　無敵だって金曜日だもん！";
  } else if (weekNumber == 6) {
    return "土曜出勤がんばるぞい！";
  }
};

const getTweetText = (weekNumber) => {
  return `${getJPDayText(weekNumber)}曜日が街にやってくる(絶望)\n\n\n${getkashiText(weekNumber)}\n\n\n#newgame #時報`;
};

const tweet = async () => {
  const twitterClient = new TwitterApi({
    appKey: functions.config().twitter.key,
    appSecret: functions.config().twitter.secret,
    accessToken: functions.config().twitter.accesstoken,
    accessSecret: functions.config().twitter.accesssecret,
  });
  const date = new Date(new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }));
  await twitterClient.v1.tweet(getTweetText(date.getDay()));
};

export const mondayNewgameTwitterBot = functions.pubsub.schedule('1 1 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async (context) => {
    await tweet();
  });

// export const mondayNewgameTwitterBotHTTP = functions.https.onRequest(async (request, response) => {
//   functions.logger.info(request);
//   await tweet();
//   response.send("hi!");
// });
