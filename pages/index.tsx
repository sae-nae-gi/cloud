import { useState } from "react";
import { NextPage} from "next";
import styled from "@emotion/styled";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";

const StyledArticle = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledInputWrapper = styled.div`
  padding: 20px;
`
const StyledLabel = styled.label`
  font-size: 26px;
  line-height: 40px;
  width: 100px;
  height: 40px;
  margin-right: 16px;
`;

const StyledFieldSet = styled.fieldset`
  margin-bottom: 30px;
`;

const StyledInput = styled.input`
  font-size: 26px;
  width: 100px;
  height: 40px;
`

const StyledSubmitButton = styled.button`
  background-color: ${({theme}) => theme.colors.submitButton};
  color: #fff;
  font-size: 16px;
  width: 200px;
  height: 60px;
  padding: 16px;
  border-radius: 4px;
  cursor: pointer;

  :hover {
    box-shadow: -10px 0 13px -7px #000, 10px 0 13px -7px #000, -7px -8px 15px -1px rgba(0, 0, 0, 0);
  }
`;

const IndexPage: NextPage<IndexPageProps> = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const moveToRoom = () => {
    router.push(`/meet/${nanoid()}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    moveToRoom();
    
  }

  const handleChange = (e) => {
    if(e.target.value.length < 20){
      setName(e.target.value);
    }
    else {
      return false;
    }
  }

  return (
    <StyledArticle>
      <StyledInputWrapper>
        <form onSubmit={handleSubmit}>
          <StyledFieldSet>
            <StyledLabel>name:</StyledLabel>
            <StyledInput value={name} onChange={handleChange}/>
          </StyledFieldSet>
          <StyledSubmitButton type="submit">Create Meeting</StyledSubmitButton>
        </form>
      </StyledInputWrapper>
    </StyledArticle>
  )
}
interface IndexPageProps {
  
}

export default IndexPage;