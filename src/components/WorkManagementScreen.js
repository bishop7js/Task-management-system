import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const WorkManagementScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [tasks, setTasks] = useState([]);

  const PrimaryButton = styled.button`
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  `;

  const renderTasksList = () => {
    return tasks.map((task) => {
      return (
        <div
          style={{
            margin: 12,
          }}
        >
          <Card style={{ backgroundColor: "#BDD6FB" }}>
            <CardContent>
              <Typography style={{ fontWeight: "bold" }}>
                {task.title}
              </Typography>
              <Typography style={{ fontWeight: "normal" }}>
                {task.description}
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                }}
              >
                <h5>{task.time}</h5>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    });
  };

  const onSubmit = (data) => {
    function getCurrentTimeInAMPMFormat() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12; // Convert 0 to 12
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero if necessary

      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    const currentTimeInAMPM = getCurrentTimeInAMPMFormat();

    const updatedData = {
      title: data.title,
      description: data.description,
      time: currentTimeInAMPM,
    };

    const newTasksList = [...tasks, updatedData];

    setTasks(newTasksList);
  };

  const TaskInputForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h3>Title</h3>
            <input
              {...register("title")}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "100%",
                fontSize: "16px",
                marginBottom: "10px",
                margin: "12px",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <h3>Description</h3>
            <textarea
              {...register("description")}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "100%",
                fontSize: "16px",
                marginBottom: "10px",
                margin: "12px",
              }}
            />
          </div>

          <PrimaryButton type="submit">Add task</PrimaryButton>
        </div>
      </form>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Task Management System</h1>
      <h2>Create your task here</h2>
      <div>{TaskInputForm()}</div>
      <div>{renderTasksList()}</div>
    </div>
  );
};

export default WorkManagementScreen;
