
const express = require('express');
const openai = require('../middlewares/openai');
const { 
	initMiddleware,
	creditCheck,
	contentFilterCheck,
	sendResponse,
	creditPayment,
	saveToHistory,
}  = require('./middleware');

let app = express.Router()

app.use('/', initMiddleware, creditCheck); 

app.use('/', require('./blog/blog_ideas'));
app.use('/', require('./blog/blog_intros'));
app.use('/', require('./blog/blog_titles'));
app.use('/', require('./blog/blog_section'));
app.use('/', require('./blog/blog_conclusion'));
app.use('/', require('./blog/article_writer'));
app.use('/', require('./blog/article_rewriter'));
app.use('/', require('./blog/article_outlines'));
app.use('/', require('./blog/talking_points'));
app.use('/', require('./blog/paragraph_writer'));
app.use('/', require('./blog/content_rephrase'));

app.use('/', require('./ads/facebook_ads'));
app.use('/', require('./ads/facebook_ads_headlines'));
app.use('/', require('./ads/google_ad_titles'));
app.use('/', require('./ads/linkedin_ad_descriptions'));
app.use('/', require('./ads/linkedin_ad_headlines'));
app.use('/', require('./ads/google_ad_descriptions'));
app.use('/', require('./ads/app_sms_notifications'));
app.use('/', require('./ads/sales_email_generator'));

app.use('/', require('./social/social_media_post_personal'));
app.use('/', require('./social/social_media_post_business'));
app.use('/', require('./social/instagram_captions'));
app.use('/', require('./social/instagram_hashtags'));
app.use('/', require('./social/twitter_tweets'));
app.use('/', require('./social/youtube_titles'));
app.use('/', require('./social/youtube_descriptions'));
app.use('/', require('./social/youtube_outlines'));
app.use('/', require('./social/linkedin_posts'));
app.use('/', require('./social/tiktok_video_scripts'));


app.use('/', contentFilterCheck); 
app.use('/', creditPayment); 
app.use('/', saveToHistory); 


app.use('/', sendResponse); 

module.exports = app