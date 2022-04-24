import React from "react";
import { CardContainer } from "./styles";

type CardProps = {
  /* id: string, */
  text: string;
};

export function Card({ text }: CardProps) {
  return <CardContainer>{text}</CardContainer>;
}
