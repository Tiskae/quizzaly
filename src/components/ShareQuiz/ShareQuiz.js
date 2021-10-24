import React from "react";
import * as classes from "./ShareQuiz.module.css";
import Button from "../../UI/Button/Button";

import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  InstapaperShareButton,
  InstapaperIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const ShareQuiz = (props) => {
  const quote =
    "Hey👋, I'm inviting you to try out Quizzaly, a quiz app only for the tough🏋️‍♂️🏋️‍♀️. I just participated and found it awesome. Try it out here ";

  const hashtagsArr = ["game", "quizzaly", "reactjs"];
  const hashtags = "#game #quizzaly #reactjs";

  //   const

  const url = "https://quizzaly.netlify.app/";

  return (
    <div className={classes.ShareQuiz}>
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
          related={["tiskae1"]}
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

export default ShareQuiz;
