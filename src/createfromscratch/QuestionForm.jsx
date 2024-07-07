import React, { useState, useEffect } from "react";
import TableChartOutlinedIcon from "@material-ui/icons/TableChartOutlined";
import {
  CropOriginal,
  CheckBox,
  ShortText,
  Subject,
  MoreVertRounded,
  FilterNone,
  AddCircleOutline,
  OndemandVideo,
  TextFields,
  Close,
  AddToPhotosOutlined,
} from "@material-ui/icons";
import {
  Select,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  MenuItem,
  Button,
  Radio,
  FormControlLabel,
  Icon,
  TextField,
} from "@material-ui/core";
import { BsTrash, BsFileText } from "react-icons/bs";
import { FcRightUp } from "react-icons/fc";
import "./QuestionForm.css";
import { DragIndicator } from "@material-ui/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CgOpenCollective } from "react-icons/cg";
import SaveIcon from "@material-ui/icons/SaveAlt";
import Toolbar from "./Toolbar";
import ImageModal from "./ImageModal";
import TableInputModal from "./TableInputModal";
import LatexModal from "./LatexInput/LatexModal";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
};

var strs = [];
const id=uuidv4();
function QuestionForm() {
  const [csvContent, setCsvContent] = useState({ str: [] });
  const [latexData, setLatexData] = useState({ latex: [] });
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      questionText: "",
      questionType: "MCQ",
      options: [],
      open: false,
      required: false,
      chosenAnswer: "",
      weightage: 1,
      weightSet: 0,
      image: strs,
      table: csvContent.str,
      latex: latexData.latex,
    },
  ]);

  const [isLatexOpen, setIsLatexOpen] = useState(false);

  const openLatexModal = () => {
    setIsLatexOpen(true);
  };

  const closeLatexModal = () => {
    setIsLatexOpen(false);
  };

  const handleLatexSubmit = (latexData) => {
    console.log(latexData);
    setLatexData(latexData);
  };

  const [openImageModal, setOpenImageModal] = useState(false);
  const handleOpenImageModal = () => {
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    console.log(strs);
    setOpenImageModal(false);
  };

  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  const openTableModal = () => {
    console.log("table open");
    setIsTableModalOpen(true);
  };

  const closeTableModal = () => {
    setIsTableModalOpen(false);
  };

  const handleSaveTable = (csvContent) => {
    setCsvContent(csvContent);
    console.log("CSV Content:", csvContent.str);
  };
  useEffect(() => {
    setQuestions(
      questions.map((question) => ({
        ...question,
        image: strs,
      }))
    );
  }, [strs]);

  const filename = 2024610 + ".json";
  const [data, sendData] = useState({
    surveyId:"",
    SurveyTitle: "",
    SurveyDesc: "",
    qs: [...questions],
  });

  /*
  // for download and testing form purpose 
  function saveForm() {
    sendData((dat) =>({
      ...data,
      qs:questions
    }))
    try {
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error writing JSON to file:", error);
    }
  }
 */
  
  const saveForm = async () => {
    sendData((dat) => ({
      ...dat,
      surveyId: id,
      qs: questions,
    }));
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/survey/saveSurvey",
        data
      );
      console.log("Survey saved successfully!", response.data);
      // Optionally, handle success (e.g., show confirmation message)
    } catch (error) {
      console.error("Error saving survey:", error);
      // Handle error (e.g., show error message)
    }
  };
  function setWeightage(weight, qno) {
    var Questions = [...questions];
    Questions[qno].weightage = weight;
    setQuestions(Questions);
  }

  function doneWeightage(i) {
    var qs = [...questions];
    qs[i].weightSet = 1;
    setQuestions(qs);
  }

  function addWeightage(i) {
    var qs = [...questions];
    setQuestions(qs);
    qs[i].weightSet = 2;
    console.log(i + " add weight " + qs[i].weightage);
  }

  function getWeightage(i) {
    var qs = [...questions];
    let t = 0;
    if (qs[i].weightSet === 1 || qs[i].weightage === 2) {
      t = qs[i].weightage;
    }
    return t;
  }

  function addQuestionType(i, type) {
    let qs = [...questions];
    qs[i].questionType = type;
    setQuestions(qs);
  }

  function changeOptionValue(text, i, j) {
    var optionsQuestion = [...questions];
    optionsQuestion[i].options[j].optionText = text;
    setQuestions(optionsQuestion);
  }

  function changeOptionWeight(text, i, j) {
    var optionsQuestion = [...questions];
    optionsQuestion[i].options[j].optionWeight = text;
    setQuestions(optionsQuestion);
  }

  function addMoreQuestionField() {
    expandCloseAll();
    setQuestions([
      ...questions,
      {
        id: uuidv4(),
        questionText: "Question",
        questionType: "MCQ",
        options: [{ optionText: "Option 1" }],
        open: true,
        required: false,
        weightSet: 0,
        weightage: 1,
      },
    ]);
  }

  function addOption(i) {
    var quests = [...questions];
    if (
      quests[i].options.length < 5 &&
      (quests[i].questionType === "MCQ" || quests[i].questionType === "MSQ")
    ) {
      quests[i].options.push({
        optionText: "Option " + (quests[i].options.length + 1),
        optionWeight: 0,
      });
    } else {
      console.log("Max limit reached");
    }
    setQuestions(quests);
  }

  function copyQuestion(i) {
    expandCloseAll();
    let quests = [...questions];
    var newQuestion = { ...quests[i] };
    setQuestions([...questions, newQuestion]);
  }

  function deleteQuestion(i) {
    let quests = [...questions];
    if (questions.length > 1) {
      quests.splice(i, 1);
    }
    setQuestions(quests);
  }

  function removeOption(i, j) {
    var removeOptionsQuestion = [...questions];
    if (removeOptionsQuestion[i].options.length >= 1) {
      removeOptionsQuestion[i].options.splice(j, 1);
      setQuestions(removeOptionsQuestion);
      console.log(questions);
    }
  }

  function expandCloseAll() {
    let ques = [...questions];
    for (let j = 0; j < ques.length; j++) {
      ques[j].open = false;
    }
    setQuestions(ques);
  }

  function handleExpand(i) {
    let ques = [...questions];
    for (let j = 0; j < ques.length; j++) {
      if (i === j) {
        ques[i].open = !ques[i].open;
      } else {
        ques[j].open = false;
      }
    }
    setQuestions(ques);
  }

  function setregex(text, i) {
    var qs = [...questions];
    qs[i].regex = text;
    setQuestions(qs);
    console.log(questions);
  }

  function changeSurveyTitle(text) {
    sendData((dat) => ({
      ...data,
      SurveyTitle: text,
    }));
  }
  function changeSurveyDesc(text) {
    sendData((dat) => ({
      ...data,
      SurveyDesc: text,
    }));
  }

  function questionsUI() {
    return (
      <div>
        <div>
          {questions.map((ques, i) => (
            <Draggable key={i} draggableId={i + "id"} index={i}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <div>
                    <div style={{ marginBottom: "0px" }}>
                      <div style={{ width: "100%", marginBottom: "0px" }}>
                        <DragIndicator
                          style={{
                            transform: "rotate(-90deg)",
                            color: "#DAE0E2",
                            position: "relative",
                            left: "300px",
                          }}
                          fontSize="small"
                        />
                      </div>
                      <div key={i}>
                        <Accordion
                          expanded={ques.open}
                          onChange={() => handleExpand(i)}
                          className={ques.open ? "addBorder" : "close"}
                        >
                          <AccordionSummary
                            aria-controls="panelia-content"
                            id="panelia-header"
                            elevation={1}
                            style={{ width: "100%", background: "var(--qb)" }}
                          >
                            {!ques.open ? (
                              <div className="saved_questions">
                                <Typography
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: "400",
                                    letterSpacing: ".3px",
                                    lineHeight: "30px",
                                    paddingBottom: "8px",
                                  }}
                                >
                                  {i + 1}.{questions[i].questionText}
                                </Typography>
                                {ques.options.map((op, j) => (
                                  <div className="add_question_body" key={j}>
                                    <div style={{ display: "flex" }}>
                                      <FormControlLabel
                                        style={{
                                          marginLeft: "5px",
                                          marginBottom: "5px",
                                        }}
                                        disabled
                                        control={
                                          <input
                                            type={ques.questionType}
                                            color="primary"
                                            style={{ marginRight: "3px" }}
                                            required={ques.required}
                                            placeholder={op.optionText}
                                          />
                                        }
                                        label={
                                          <Typography
                                            style={{
                                              fontSize: "13px",

                                              fontWeight: "400",

                                              letterSpacing: ".2px",

                                              lineHeight: "25px",

                                              color: "#202125",
                                            }}
                                          >
                                            {ques.options[j].text}
                                          </Typography>
                                        }
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              i + 1 + ". " + ques.questionText
                            )}
                          </AccordionSummary>
                          <div className="question_boxes">
                            {questions[i].weightSet !== 1 ||
                            !(
                              questions[i].questionType === "MCQ" ||
                              questions[i].questionType === "MSQ"
                            ) ? (
                              <AccordionDetails className="add_question">
                                <div className="add_question_top">
                                  <input
                                    type="text"
                                    className="question"
                                    placeholder="Question"
                                    value={ques.questionText}
                                    onChange={(e) => {
                                      const updatedQuestions = [...questions];
                                      updatedQuestions[i].questionText =
                                        e.target.value;
                                      setQuestions(updatedQuestions);
                                    }}
                                  />
                                  <Button onClick={handleOpenImageModal}>
                                    <CropOriginal
                                      style={{ color: "#5F6368" }}
                                    />
                                  </Button>

                                  <ImageModal
                                    open={openImageModal}
                                    onClose={handleCloseImageModal}
                                    strs={strs}
                                  />
                                  <Select
                                    className="select"
                                    style={{
                                      color: "var(--text2)",
                                      fontSize: "13px",
                                    }}
                                    value={ques.questionType}
                                    onChange={(e) => {
                                      const updatedQuestions = [...questions];
                                      updatedQuestions[i].questionType =
                                        e.target.value;
                                      setQuestions(updatedQuestions);
                                    }}
                                  >
                                    <MenuItem
                                      id="MCQ"
                                      value="MCQ"
                                      onClick={() => {
                                        addQuestionType(i, "MCQ");
                                      }}
                                    >
                                      MCQ
                                    </MenuItem>
                                    <MenuItem
                                      id="MSQ"
                                      value="MSQ"
                                      onClick={() => {
                                        addQuestionType(i, "MSQ");
                                      }}
                                    >
                                      MSQ
                                    </MenuItem>
                                    <MenuItem
                                      id="INFO"
                                      value="INFO"
                                      onClick={() => {
                                        addQuestionType(i, "INFO");
                                      }}
                                    >
                                      INFO
                                    </MenuItem>
                                  </Select>
                                </div>
                                {ques.options.map((op, j) => (
                                  <div key={j} className="add_question_body">
                                    <input
                                      type={
                                        ques.questionType === "MCQ"
                                          ? "radio"
                                          : ques.questionType === "MSQ"
                                          ? "CheckBox"
                                          : ""
                                      }
                                      value={op.text}
                                      onChange={(e) => {
                                        const updatedQuestions = [...questions];
                                        updatedQuestions[i].options[j].text =
                                          e.target.value;
                                        setQuestions(updatedQuestions);
                                      }}
                                    />
                                    <div>
                                      <input
                                        type="text"
                                        className="textInput"
                                        placeholder="option"
                                        value={ques.options[j].optionText}
                                        onChange={(e) => {
                                          changeOptionValue(
                                            e.target.value,
                                            i,
                                            j
                                          );
                                        }}
                                      ></input>
                                    </div>
                                    <Button>
                                      <Close
                                        onClick={() => {
                                          removeOption(i, j);
                                        }}
                                      />
                                    </Button>
                                  </div>
                                ))}

                                {ques.options.length < 5 ? (
                                  <div className="add_question_body">
                                    <FormControlLabel
                                      disabled
                                      control={
                                        ques.questionType === "MCQ" ? (
                                          <input
                                            type="radio"
                                            color="primary"
                                            aria-label="secondary-checkbox"
                                            style={{
                                              marginLeft: "10px",
                                              marginRight: "10px",
                                            }}
                                            disabled
                                          />
                                        ) : ques.questionType === "MSQ" ? (
                                          <input
                                            type="CheckBox"
                                            color="primary"
                                            aria-label="secondary-checkbox"
                                            style={{
                                              marginLeft: "10px",
                                              marginRight: "10px",
                                            }}
                                            disabled
                                          />
                                        ) : (
                                          <>
                                            <ShortText
                                              style={{ marginRight: "10px" }}
                                            />
                                            <TextField
                                              onChange={(e) =>
                                                setregex(e.target.value, i)
                                              }
                                              placeholder={
                                                ques.regex
                                                  ? ques.regex
                                                  : "enter regex"
                                              }
                                            ></TextField>
                                          </>
                                        )
                                      }
                                      label={
                                        ques.questionType === "MCQ" ||
                                        ques.questionType === "MSQ" ? (
                                          <div>
                                            <input
                                              type="text"
                                              className="textInput"
                                              style={{
                                                fontSize: "13px",
                                                width: "60px",
                                              }}
                                              placeholder="Add other"
                                            ></input>
                                            <Button
                                              size="small"
                                              style={{
                                                textTransform: "none",
                                                color: "var(--blue)",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                              }}
                                              onClick={() => {
                                                addOption(i);
                                              }}
                                            >
                                              Add Option
                                            </Button>
                                          </div>
                                        ) : (
                                          ""
                                        )
                                      }
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}

                                <div className="add_footer">
                                  <div className="add_question_bottom_left">
                                    <Button
                                      size="small"
                                      onClick={() => {
                                        doneWeightage(i);
                                      }}
                                    >
                                      <FcRightUp />
                                      Set Weight
                                    </Button>
                                  </div>
                                  <div className="add_question_bottom">
                                    <Button
                                      aria-label="copy"
                                      onClick={() => {
                                        copyQuestion(i);
                                      }}
                                    >
                                      <FilterNone />
                                    </Button>
                                    <Button
                                      aria-label="delete"
                                      onClick={() => {
                                        deleteQuestion(i);
                                      }}
                                    >
                                      <BsTrash />
                                    </Button>
                                    <Button aria-label="req">
                                      <span>Required</span>{" "}
                                      <Switch
                                        name="checkedA"
                                        color="primary"
                                        checked={ques.required}
                                        onChange={(e) => {
                                          const updatedQuestions = [
                                            ...questions,
                                          ];
                                          updatedQuestions[i].required =
                                            e.target.checked;
                                          setQuestions(updatedQuestions);
                                        }}
                                      />
                                    </Button>
                                  </div>
                                </div>
                              </AccordionDetails>
                            ) : (
                              <AccordionDetails className="add_question">
                                <div className="top_header">
                                  Set the Weightage
                                </div>
                                <div className="add_question_top">
                                  <input
                                    type="text"
                                    className="question"
                                    placeholder="Question"
                                    value={ques.questionText}
                                    onChange={(e) => {
                                      const updatedQuestions = [...questions];
                                      updatedQuestions[i].questionText =
                                        e.target.value;
                                      setQuestions(updatedQuestions);
                                    }}
                                    disabled
                                  />
                                  <input
                                    type="number"
                                    className="weight"
                                    min="1"
                                    step="1"
                                    placeholder={getWeightage(i)}
                                    onChange={(e) =>
                                      setWeightage(e.target.value, i)
                                    }
                                  />
                                </div>

                                {ques.options.map((op, j) => (
                                  <div key={j} className="add_question_body">
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "10px",
                                      }}
                                    >
                                      <input
                                        style={{ margin: "5px" }}
                                        type={
                                          ques.questionType === "MCQ"
                                            ? "radio"
                                            : ques.questionType === "MSQ"
                                            ? "CheckBox"
                                            : "text"
                                        }
                                        value={op.text}
                                        onChange={(e) => {
                                          const updatedQuestions = [
                                            ...questions,
                                          ];
                                          updatedQuestions[i].options[j].text =
                                            e.target.value;
                                          setQuestions(updatedQuestions);
                                        }}
                                        disabled
                                      />
                                      <div>
                                        <input
                                          type="text"
                                          className="textInput"
                                          placeholder="option"
                                          style={{ margin: "5px" }}
                                          value={ques.options[j].optionText}
                                          onChange={(e) => {
                                            changeOptionValue(
                                              e.target.value,
                                              i,
                                              j
                                            );
                                          }}
                                          disabled
                                        ></input>
                                      </div>
                                      <div>
                                        <input
                                          style={{ margin: "5px" }}
                                          type="number"
                                          className="textInput"
                                          placeholder="optionWeight"
                                          min="0"
                                          step="1"
                                          value={ques.options[j].optionWeight}
                                          onChange={(e) => {
                                            changeOptionWeight(
                                              e.target.value,
                                              i,
                                              j
                                            );
                                          }}
                                        ></input>
                                      </div>
                                      <Button>
                                        <Close
                                          onClick={() => {
                                            removeOption(i, j);
                                          }}
                                        />
                                      </Button>
                                    </div>
                                  </div>
                                ))}

                                {ques.options.length < 5 ? (
                                  <div className="add_question_body">
                                    <FormControlLabel
                                      disabled
                                      control={
                                        ques.questionType === "MCQ" ? (
                                          <input
                                            type="radio"
                                            color="primary"
                                            aria-label="secondary-checkbox"
                                            style={{
                                              marginLeft: "10px",
                                              marginRight: "10px",
                                            }}
                                            disabled
                                          />
                                        ) : ques.questionType === "MSQ" ? (
                                          <input
                                            type="CheckBox"
                                            color="primary"
                                            aria-label="secondary-checkbox"
                                            style={{
                                              marginLeft: "10px",
                                              marginRight: "10px",
                                            }}
                                            disabled
                                          />
                                        ) : (
                                          <ShortText
                                            style={{ marginRight: "10px" }}
                                          />
                                        )
                                      }
                                      label={
                                        <div>
                                          <input
                                            type="text"
                                            className="textInput"
                                            style={{
                                              fontSize: "13px",
                                              width: "60px",
                                            }}
                                            placeholder="Add other"
                                          ></input>
                                          <Button
                                            size="small"
                                            style={{
                                              textTransform: "none",
                                              color: "#4285f4",
                                              fontSize: "13px",
                                              fontWeight: "600",
                                            }}
                                            onClick={() => {
                                              addOption(i);
                                            }}
                                          >
                                            Add Option
                                          </Button>
                                        </div>
                                      }
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}

                                <div className="add_footer">
                                  <div className="add_question_bottom_left">
                                    <Button
                                      size="small"
                                      onClick={() => {
                                        addWeightage(i);
                                      }}
                                    >
                                      <FcRightUp />
                                      Done
                                    </Button>
                                  </div>
                                  <div className="add_question_bottom">
                                    <Button
                                      aria-label="copy"
                                      onClick={() => {
                                        copyQuestion(i);
                                      }}
                                    >
                                      <FilterNone />
                                    </Button>
                                    <Button
                                      aria-label="delete"
                                      onClick={() => {
                                        deleteQuestion(i);
                                      }}
                                    >
                                      <BsTrash />
                                    </Button>
                                    <Button aria-label="req">
                                      <span>Required</span>{" "}
                                      <Switch
                                        name="checkedA"
                                        color="primary"
                                        checked={ques.required}
                                        onChange={(e) => {
                                          const updatedQuestions = [
                                            ...questions,
                                          ];
                                          updatedQuestions[i].required =
                                            e.target.checked;
                                          setQuestions(updatedQuestions);
                                        }}
                                      />
                                    </Button>
                                  </div>
                                </div>
                              </AccordionDetails>
                            )}
                            <div className="question_edit">
                              <Button
                                onClick={() => {
                                  addMoreQuestionField();
                                }}
                              >
                                <AddCircleOutline
                                  fontSize="large"
                                  className="edit"
                                />
                              </Button>
                              <Button onClick={openTableModal}>
                                <TableChartOutlinedIcon
                                  className="edit"
                                  fontSize="large"
                                />
                              </Button>
                              <TableInputModal
                                isTableModalOpen={isTableModalOpen}
                                closeModal={closeTableModal}
                                onSave={handleSaveTable}
                                csvContent={csvContent}
                                setCsvContent={setCsvContent}
                              />
                              <Button onClick={openLatexModal}>
                                <Icon
                                  fontSize="small"
                                  style={{
                                    textTransform: "none",
                                    color: "var(--text2)",
                                    paddingBottom: "30px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Lₓ
                                </Icon>
                              </Button>
                              <LatexModal
                                isOpen={isLatexOpen}
                                onClose={closeLatexModal}
                                onSubmit={handleLatexSubmit}
                                setLatexData={setLatexData}
                                latexData={latexData}
                              />

                              <Button>
                                <TextFields className="edit" fontSize="large" />
                              </Button>
                            </div>
                          </div>
                        </Accordion>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
        </div>
        <div>
          <SaveIcon onClick={() => saveForm()} />
        </div>
      </div>
    );
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    var itemgg = [...questions];
    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );
    setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  return (
    <div>
      <div className="toolbar">
        <Toolbar data={data} />
      </div>
      <div className="question_form">
        <br />
        <div className="section">
          <div className="question_title_section">
            <div className="question_form_top">
              <input
                type="text"
                className="question_form_top_name"
                style={{ color: "black" }}
                placeholder="Untitled document"
                onChange={(e) => {
                  changeSurveyTitle(e.target.value);
                }}
              />
              <input
                type="text"
                className="question_form_top_desc"
                placeholder="Survey description"
                onChange={(e) => {
                  changeSurveyDesc(e.target.value);
                }}
              />
            </div>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {questionsUI()}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default QuestionForm;
