import React from 'react'
import logo from '../assets/light-bulb-11.png';
import { Heading, Image, Text } from '@chakra-ui/react';


const Header = () => {
  return (
    <>
      <Image src={logo} alt='logo' width={100} marginBottom='1rem' />
      <Heading color='white' marginBottom='1rem'>
        AI keyword Extractor
      </Heading>
      <Text fontSize={25} textAlign='center'>
        Paste text Bellow 
      </Text>
    </>
  )
}

export default Header;