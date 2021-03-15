import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";

import { GlobalState, Testimonial } from "@types";

import "./style.scss";

function constructSamples(
  credibilityBuilders: string[] | undefined,
  testimonials: Testimonial[] | undefined,
  color: string | undefined
) {
  const formattedTestimonials =
    !testimonials || testimonials?.length === 0
      ? []
      : testimonials.map((testimonial) => (
          <li style={{ color }}>
            <span className="rcw-testimonial-author">
              "{testimonial.author}: {testimonial.text}"
            </span>{" "}
          </li>
        ));

  const formattedCredibilityBuilders =
    !credibilityBuilders || credibilityBuilders.length === 0
      ? []
      : credibilityBuilders.map((credibilityBuilder) => (
          <li style={{ color }}>
            <span>"{credibilityBuilder}"</span>
          </li>
        ));

  const lists = [formattedTestimonials, formattedCredibilityBuilders];
  const longestListIndex = lists.reduce(
    (maxI, el, i, arr) => (el.length > arr[maxI].length ? i : maxI),
    0
  );
  const longestList = lists[longestListIndex];

  const samples: React.ReactElement[] = [];

  for (let i = 0; i < longestList.length; i++) {
    const testimonial = formattedTestimonials[i];
    const credibilityBuilder = formattedCredibilityBuilders[i];

    if (testimonial) {
      samples.push(testimonial);
    }
    if (credibilityBuilder) {
      samples.push(credibilityBuilder);
    }
  }

  return samples;
}

function Testimonials({ isLaunerEmbdded }: { isLaunerEmbdded?: boolean }) {
  const { dialogConfig, parameters, showChat } = useSelector(
    (state: GlobalState) => ({
      dialogConfig: state.dialogConfig.config,
      parameters: state.dialogConfig.parameters,
      showChat: state.behavior.showChat,
    })
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const samples = useMemo(
    () =>
      constructSamples(
        dialogConfig?.credibilityBuilders,
        dialogConfig?.testimonials,
        isLaunerEmbdded ? "#FFF" : parameters?.titleBackgroundColor
      ),
    []
  );

  useEffect(() => {
    const intervalValue = 10000;

    const interval = setInterval(() => {
      setCurrentIndex((index) => (index + 1) % samples.length);
    }, intervalValue);
    return () => clearInterval(interval);
  }, []);

  // if (samples.length === 11) {
  //   return <div />;
  // }

  return (
    <div
      style={{ background: showChat ? "#fff" : "transparent" }}
      className={cn(
        "rcw-testimonials-container",
        isLaunerEmbdded && "rcw-testimonial-container-launcher-embedded"
      )}
    >
      <ul className="rcw-testimonials-list">{samples[currentIndex]}</ul>
    </div>
  );
}

export default Testimonials;
