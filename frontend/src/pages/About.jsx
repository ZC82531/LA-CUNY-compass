import React from "react";
import Navbar from "../components/NavBar";
import Background from "../components/Background";
import { MdOutlineSchool } from "react-icons/md";
import { AiOutlineFundProjectionScreen, AiOutlineTeam } from "react-icons/ai";
import { RiRobot2Line } from "react-icons/ri";
import { IoIosHelpCircleOutline } from "react-icons/io";

const About = () => {
  return (
    <Background>
      <Navbar />
      <div className="m-4 flex flex-grow items-center justify-center">
        <div className="flex h-[700px] w-full max-w-xl flex-col rounded-md bg-white p-4">
          <div className="flex flex-col space-y-4 overflow-auto">
            <div className="flex animate-fade-in-down items-start rounded p-4 hover:bg-gray-100">
              <MdOutlineSchool className="mr-4 mt-2 flex-shrink-0 text-2xl" />
              <div>
                <h2 className="font-semibold">Empowering CUNY Students</h2>
                <p className="text-sm text-gray-600">
                  Our mission is to increase awareness and usage of essential
                  CUNY resources that address students' mental health, food
                  insecurity, housing instability, and other basic needs,
                  enabling a thriving learning environment.
                </p>
              </div>
            </div>

            <div className="flex animate-fade-in-down items-start rounded p-4 hover:bg-gray-100">
              <AiOutlineFundProjectionScreen className="mr-4 mt-2 flex-shrink-0 text-2xl" />
              <div>
                <h2 className="font-semibold">Hackathon Project</h2>
                <p className="text-sm text-gray-600">
                  Developed as part of the CTP HACK 2024 Hackathon, our platform
                  aims to leverage digital tools to connect students with vital
                  resources and support systems.
                </p>
              </div>
            </div>

            <div className="flex animate-fade-in-down items-start rounded p-4 hover:bg-gray-100">
              <RiRobot2Line className="mr-4 mt-2 flex-shrink-0 text-2xl" />
              <div>
                <h2 className="font-semibold">AI-Powered Assistance</h2>
                <p className="text-sm text-gray-600">
                  Our website features an AI-driven questionnaire and chatbot to
                  guide students toward the resources they need, while also
                  providing a comprehensive map of available CUNY services.
                </p>
              </div>
            </div>

            <div className="flex animate-fade-in-down items-start rounded p-4 hover:bg-gray-100">
              <IoIosHelpCircleOutline className="mr-4 mt-2 flex-shrink-0 text-2xl" />
              <div>
                <h2 className="font-semibold">Comprehensive Resource Guide</h2>
                <p className="text-sm text-gray-600">
                  From internet and tech support to housing, food, and mental
                  health services, we provide an all-encompassing directory of
                  CUNY’s essential resources, accessible at the click of a
                  button.
                </p>
              </div>
            </div>

            <div className="flex animate-fade-in-down items-start rounded p-4 hover:bg-gray-100">
              <AiOutlineTeam className="mr-4 mt-2 flex-shrink-0 text-2xl" />
              <div>
                <h2 className="font-semibold">Collaborative Effort</h2>
                <p className="text-sm text-gray-600">
                  Built by a passionate team of developers with expertise in
                  React, Python, and more, we are dedicated to making CUNY
                  resources more accessible to every student.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default About;
