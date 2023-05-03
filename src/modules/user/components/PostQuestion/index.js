import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Editor from '../../../../common/Editor';
import { TagsInput } from 'react-tag-input-component';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { POSTREQUEST } from '../../../../config/requests';
import { endpoints } from '../../../../config/endpoints';
import useSwal from '../../../../common/Errors/SwalCall';

function PostQuestion() {
  const [Body, setBody] = useState('');
  const [Title, setTitle] = useState('');
  const [Tags, setTags] = useState([]);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const fire = useSwal();
  const createpost = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))?._id;

      if (String(Title)?.trim().length < 5)
        return fire('info', 'Add a valid title! minimum 5 characters long!');

      if (String(Body)?.trim().length < 20)
        return fire(
          'info',
          'Add a valid description! minimum 20 characters long!'
        );
      console.log('tags', Tags);
      if (Tags?.length < 1 || !Tags)
        return fire('info', 'Add a minimum of 1 tag');
      setloading(true);
      const data = await POSTREQUEST(endpoints.createpost, {
        Author: currentUser,
        Title: Title,
        Body: Body,
        Tags: Tags,
      });
      if (data.type === 'success') {
        setloading(false);
        navigate('/question/' + data?.result?._id);
      } else {
        fire('error', data?.result);
      }
      setloading(false);
    } catch (e) {
      setloading(false);
      return fire(
        'error',
        e?.message || 'something went wrong try again later!'
      );
    }
  };

  useEffect(() => {
    return () => {
      setBody(null);
      setTags(null);
      setTitle(null);
      setloading(null);
    };
  }, []);
  return (
    <Box
      className=" QuestionPage shadow2 "
      p={'1rem'}
      bg="white"
      borderRadius={'12px'}
      shadow={'md'}
    >
      <Flex flex={1} justify={'center'} align={'center'} w={'full'} mb="10">
        <Heading
          lineHeight={1.1}
          fontWeight={700}
          color="var(--primary)"
          fontSize={{ base: '4xl', sm: '4xl', lg: '4xl' }}
        >
          <Text as={'span'} position={'relative'}>
            Ask a Question
          </Text>
          <br />
        </Heading>
      </Flex>
      <div className="input_title">
        <Text as={'h3'} fontSize="1.4rem" fontWeight={'500'}>
          Add a Title
        </Text>
        <p>
          Be specidfied and imagine you are asking question from another person
        </p>
        <input
          onChange={(e) => setTitle(e.currentTarget.value)}
          type="text"
          placeholder="e.g how to add hover effect in css3?"
        />
      </div>
      <div className="Editor_container">
        <Text as={'h3'} fontSize="1.4rem" fontWeight={'500'}>
          Body
        </Text>
        <p>
          Include all the information someone might need to answer your question
        </p>
        <Editor setvalues={setBody} />
      </div>
      <div className="QuestionPage_tag Editor_container">
        <Text as={'h3'} fontSize="1.4rem" fontWeight={'500'}>
          Tags
        </Text>
        <p>Add upto 5 tags to show what is your question is about</p>
        <TagsInput
          onChange={(e) => setTags(e || [])}
          className="tagsInput"
          name="tags"
          separators={' '}
          placeHolder="write a tag name and press space-key"
        />
      </div>
      <Button
        style={{ display: 'flex', alignItems: 'center' }}
        disabled={loading}
        isLoading={loading}
        className="btn"
        onClick={createpost}
      >
        Submit
      </Button>
    </Box>
  );
}

export default PostQuestion;
