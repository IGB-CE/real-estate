import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';
import { assets } from '../assets/assets';
import { motion } from "motion/react"

const Header = () => {
    return (
        <Carousel>
        <Carousel.Item>
            <Image src={assets.hero} fluid />
          <Carousel.Caption>
            <h1>Not just a home</h1>
            <h2>"- a brand new life"</h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <Image src={assets.hero2} fluid />
          <Carousel.Caption>
            <h1>Building bridges of trust</h1>
            <h2>"With professionalism, transparence and passion"</h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <Image src={assets.hero3} fluid />
          <Carousel.Caption>
            <h1>We don't offer just buildings</h1>
            <h2>"We offer life"</h2>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
};

export default Header;
