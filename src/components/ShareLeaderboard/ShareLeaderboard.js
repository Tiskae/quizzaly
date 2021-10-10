import React from "react";
import * as classes from "./ShareLeaderboard.module.css";
import Button from "../../UI/Button/Button";

import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  HatenaShareButton,
  InstapaperShareButton,
  InstapaperIcon,
  LineShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TelegramIcon,
  TumblrShareButton,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  WorkplaceShareButton,
} from "react-share";

const ShareLeaderboard = (props) => {
  const quote =
    "Hey there, I just completed Tiz Quiz and I find it awesome, try it out as well!";

  const hashtagsArr = ["game", "quiz", "reactjs"];
  const hashtags = "#game #quiz #reactjs";

  //   const

  const url = "https://tiz-quiz.netlify.app/";

  return (
    <div className={classes.ShareLeaderboard}>
      <div className={classes.ShareBtns}>
        <FacebookShareButton
          quote={quote}
          hashtag={hashtags}
          url={url}
          onShareWindowClose={() => {
            props.close("Facebook");
          }}
        >
          <FacebookIcon size="50" round={false} borderRadius="50" />
        </FacebookShareButton>

        <WhatsappShareButton
          title={quote}
          separator=" "
          url={url}
          onShareWindowClose={() => {
            props.close("WhatsApp");
          }}
        >
          <WhatsappIcon size="50" round={false} borderRadius="50" />
        </WhatsappShareButton>

        <TwitterShareButton
          title={quote}
          //   via={quote}
          hashtags={hashtagsArr}
          related={["@tiskae1"]}
          url={url}
          onShareWindowClose={() => {
            props.close("Twitter");
          }}
        >
          <TwitterIcon size="50" round={false} borderRadius="50" />
        </TwitterShareButton>

        <TelegramShareButton
          title={quote}
          url={url}
          onShareWindowClose={() => {
            props.close("Telegram");
          }}
        >
          <TelegramIcon size="50" round={false} borderRadius="50" />
        </TelegramShareButton>

        <InstapaperShareButton
          url={url}
          onShareWindowClose={() => {
            props.close("Instapaper");
          }}
        >
          <InstapaperIcon size="50" round={false} borderRadius="50" />
        </InstapaperShareButton>

        <LinkedinShareButton
          url={url}
          title="I'm inviting you to participate in this quiz"
          summary={quote}
          source="Tiz-quiz"
          onShareWindowClose={() => {
            props.close("LinkedIn");
          }}
        >
          <LinkedinIcon size="50" round={false} borderRadius="50" />
        </LinkedinShareButton>

        <EmailShareButton
          subject="Try this out"
          body={quote}
          separator=" "
          url={url}
          onShareWindowClose={() => {
            props.close("Email");
          }}
        >
          <EmailIcon
            size="50"
            round={false}
            borderRadius="50"
            bgStyle={{ fill: "white" }}
            iconFillColor="black"
          />
        </EmailShareButton>
      </div>
      <Button clicked={() => props.close()}>Close</Button>
    </div>
  );
};

export default ShareLeaderboard;
