import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { db } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

interface Exercise {
  name?: string;
  muscleTags?: string[];
  id?: string;
}

function App() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // New exercise states
  const [newExercise, setNewExercise] = useState<Exercise>({
    name: "",
    muscleTags: [],
  });

  const exercisesCollectionRef = collection(db, "exercises");

  const getExercises = async () => {
    try {
      const data = await getDocs(exercisesCollectionRef);
      const docs: Exercise[] = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setExercises(docs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getExercises();
  }, []);

  const onSubmitExercise = async () => {
    try {
      await addDoc(exercisesCollectionRef, newExercise);

      setNewExercise({
        name: "",
        muscleTags: [],
      });
      getExercises();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteExercise = async (id: string | undefined) => {
    if (id) {
      const exerciseDoc = doc(db, "exercises", id);
      try {
        await deleteDoc(exerciseDoc);

        getExercises();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Auth />
      <div>
        <input
          placeholder="exercise name..."
          onChange={(e) =>
            setNewExercise({ ...newExercise, name: e.target.value })
          }
        />
        <input
          placeholder="muscles (split with commas)..."
          onChange={(e) =>
            setNewExercise({
              ...newExercise,
              muscleTags: e.target.value.split(", "),
            })
          }
        />
        <button onClick={onSubmitExercise}>Submit Exercise</button>
      </div>
      <div>
        {exercises?.map((exercise) => (
          <div key={exercise.id}>
            <h1>{exercise.name}</h1>
            {exercise.muscleTags?.map((muscleTag) => (
              <p key={muscleTag}>{muscleTag}</p>
            ))}
            <button
              onClick={() => {
                deleteExercise(exercise.id);
              }}
            >
              Delete Exercise
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
