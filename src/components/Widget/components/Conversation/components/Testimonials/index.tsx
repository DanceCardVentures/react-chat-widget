import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

import { GlobalState, Testimonial } from "@types";

import "./style.scss";

function constructSamples(
  credibilityBuilders: string[] | undefined,
  testimonials: Testimonial[] | undefined
) {
  const formattedTestimonials =
    !testimonials || testimonials?.length === 0
      ? []
      : testimonials.map(testimonial => {
          return `${testimonial.text} (${testimonial.author})`;
        });
  const formattedCredibilityBuilders =
    !credibilityBuilders || credibilityBuilders.length === 0
      ? []
      : credibilityBuilders;

  const lists = [formattedTestimonials, formattedCredibilityBuilders];
  const longestListIndex = lists.reduce(
    (maxI, el, i, arr) => (el.length > arr[maxI].length ? i : maxI),
    0
  );
  const longestList = lists[longestListIndex];

  let samples: string[] = [];

  for (let i = 0; i < longestList.length; i++) {
    const testimonial = formattedTestimonials[i];
    const credibilityBuilder = formattedCredibilityBuilders[i];

    if (testimonial) samples.push(testimonial);
    if (credibilityBuilder) samples.push(credibilityBuilder);
  }

  return samples;
}

function Testimonials() {
  const { dialogConfig, parameters } = useSelector((state: GlobalState) => ({
    dialogConfig: state.dialogConfig.config,
    parameters: state.dialogConfig.parameters
  }));

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const samples = useMemo(
    () =>
      constructSamples(
        dialogConfig?.credibilityBuilders,
        dialogConfig?.testimonials
      ),
    []
  );

  useEffect(() => {
    const intervalValue = 10000;

    const interval = setInterval(() => {
      setCurrentIndex(index => {
        return index === samples.length - 1 ? 0 : index + 1;
      });
    }, intervalValue);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rcw-testimonials-container">
      <span
        className="rcw-testimonial-label"
        style={{ color: parameters?.titleBackgroundColor }}
      >
        {samples[currentIndex]}
      </span>
    </div>
  );
}

export default Testimonials;
