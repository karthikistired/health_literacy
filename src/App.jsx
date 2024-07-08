import React, { useEffect } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Footer from './Footer';
import Home from './Home';
import NotFound from './NotFound';

import Navigation from './beforeLoggin/Navigation';
import Login from './beforeLoggin/Login';

import AAHLS from './afterloggin/groupsofForm/Interface_temp/AAHLS';
import BriefForm from './afterloggin/groupsofForm/Interface_temp/BriefForm';
import CAHPS from './afterloggin/groupsofForm/Interface_temp/CAHPS';
import CompositeHealth from './afterloggin/groupsofForm/Interface_temp/CompositeHealth';
import Concept from './afterloggin/groupsofForm/Interface_temp/Concept';
import Critical from './afterloggin/groupsofForm/Interface_temp/Critical';
import DAHL from './afterloggin/groupsofForm/Interface_temp/DAHL';
import Dig_Health from './afterloggin/groupsofForm/Interface_temp/Dig_Health';
import Eastern from './afterloggin/groupsofForm/Interface_temp/Eastern';
import FLLANK from './afterloggin/groupsofForm/Interface_temp/FLLANK';
import HELMA from './afterloggin/groupsofForm/Interface_temp/HELMA';
import Meter from './afterloggin/groupsofForm/Interface_temp/Meter';
import New_Vital from './afterloggin/groupsofForm/Interface_temp/New_Vital';
import OhliForm from './afterloggin/groupsofForm/Interface_temp/OhliForm';
import Rapid from './afterloggin/groupsofForm/Interface_temp/Rapid';
import SILS from './afterloggin/groupsofForm/Interface_temp/SILS';
import WLS from './afterloggin/groupsofForm/Interface_temp/WLS';
import FormGroup from './afterloggin/groupsofForm/Interface_temp/FormGroup';

import Split from './createfromscratch/Grouping/Split'
import QuestionForm from './createfromscratch/QuestionForm';
import ResponseTemplate from './createfromscratch/Respond/ResponseTemplate';
import GetSurveys from './GetSurveys';
import Surveys from './createfromscratch/Surveys';

function App() {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey && event.shiftKey && event.code === "KeyI") ||
        (event.ctrlKey && event.shiftKey && event.code === "KeyJ") ||
        (event.ctrlKey && event.shiftKey && event.code === "KeyG") ||
        (event.ctrlKey && event.code === "KeyU") ||
        (event.ctrlKey && event.code === "KeyS") ||
        (event.ctrlKey && event.code === "KeyC") ||
        (event.ctrlKey && event.code === "KeyX") ||
        (event.ctrlKey && event.code === "KeyG") ||
        (event.ctrlKey && event.code === "KeyV") ||
        (event.ctrlKey && event.code === "KeyA") ||
        (event.ctrlKey && event.code === "KeyF") ||
        (event.ctrlKey && event.code === "KeyP")
      ) {
        event.preventDefault();
      }
    }

    const handleRightClick = (event)=>{
      event.preventDefault();
    }

    document.addEventListener('contextmenu',handleRightClick);
    document.addEventListener('keydown',handleKeyDown);

    return ()=>{
      document.removeEventListener('contextmenu',handleRightClick);
      document.removeEventListener('keydown',handleKeyDown);
    }

  }, [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <NotFound />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/form/:id',
      element: <QuestionForm />
    },
    {
      path:'/responsetemplate',
      element:<ResponseTemplate/>
    },
    {
      path: '/sampleformgroup',
      element: <Split />
    },
    {
      path: '/generalform',
      element: < FormGroup />
    },
    {
      path: '/specificform',
      element: < FormGroup />
    },
    {
      path: '/all_aspects_of_health_literacy_scale',
      element: <AAHLS />
    },
    {
      path: '/brief_health_literacy_screening_tool',
      element: <BriefForm />
    },
    {
      path: '/consumer_assessment_of_healthcare_providers_and_systems',
      element: <CAHPS />
    },
    {
      path: '/composite_health_literacy_scale_and_subjective_numeracy_scale',
      element: <CompositeHealth />
    },
    {
      path: '/conceptual_based_shortform_health_literacy_questionnaire',
      element: <Concept />
    },
    {
      path: '/critical_nutrition_literacy_instrument',
      element: <Critical />
    },
    {
      path: '/demographic_assessment_for_health_literacy',
      element: <DAHL />
    },
    {
      path: '/digital_healthy_diet_literacy',
      element: <Dig_Health />
    },
    {
      path: '/eastern_middle_eastern_adult_health_literacy',
      element: <Eastern />
    },
    {
      path: '/food_label_literacy_for_applied_nutrition_knowledge_questionnaire',
      element: <FLLANK />
    },
    {
      path: '/health_literacy_measure_for_adolescents',
      element: <HELMA />
    },
    {
      path: '/medical_term_recognition_test',
      element: <Meter />
    },
    {
      path: '/newest_vital_sign_english',
      element: <New_Vital />
    },
    {
      path: '/oral_health_literacy_instrument',
      element: <OhliForm />
    },
    {
      path: '/rapid_estimate_of_adult_literacy_in_dentistry',
      element: <Rapid />
    },
    {
      path: '/single_item_screener',
      element: <SILS />
    },
    {
      path: '/weight_literacy_scale_in_english_and_spanish',
      element: <WLS />
    },
    {
      path: '/getSurveys',
      element: <GetSurveys />
    },
    {
      path: '/surveys',
      element: <Surveys />
    }
  ]);
  return (
    <div className="App">
      <Navigation />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;



/*
Forms not available!!
/eheals_ehealth_literacy_scale
/european_health_literacy_survey
/food_and_nutrition_literacy_scale_for_elementary_school_children
/fostering_literacy_for_good_health_today_flight
/health_literacy_skills_instrument
/health_literacy_skills_instrument
/hlsac_health_literacy_for_schoolaged_children
/kidney_transplant_understanding_tool
/numeracy_understanding_in_medicine_instrument
/parenting_plus_skills_index
/rapid_estimate_of_adolescent_literacy_in_medicine
/rapid_estimate_of_adolescent_literacy_in_medicine_short_form
/rapid_estimate_of_adult_literacy_in_medicine_short_form
 */