import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Image
} from "@chakra-ui/react";
import { useState,useEffect } from 'react';
const Profile = ({user,children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      const imageModule = await import(`../../../../uploads/${user.pic}`);
      setImagePath(imageModule.default);
    };
    loadImage();
  }, []);
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <i class="fa fa-eye" aria-hidden="true" onClick={onOpen} style={{marginLeft : "650px",display : "flex"}}></i>
      )}
      {/* {console.log(user)} */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            <Image
            marginLeft={130}
            marginBottom={5}
            borderRadius={"full"}
            boxSize={"150px"}
            src = {imagePath}
            alt= {`../../../../uploads/${user.pic}`}
            >

            </Image>
            {user.email}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Profile