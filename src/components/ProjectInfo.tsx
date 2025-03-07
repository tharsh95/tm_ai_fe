import { useState, useEffect } from "react";
import axios from "axios";

interface Counts {
  total: number;
  completed: number;
  frozen: number;
}

const ProjectInfo = () => {
  const [count, setCount] = useState<Counts>({ total: 0, completed: 0, frozen: 0 });
  const [participants, setParticipants] = useState<string[]>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/tasks/participants"
      );

      setParticipants(data.participants);
      setCount(data.counts);
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <div className="bg-white px-4 md:px-6 py-4 border-b">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Sprint 13
        </h1>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Date added:</p>
                <p className="mt-1 text-sm text-gray-900">12/02/2025</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Deadline:</p>
                <p className="mt-1 text-sm text-gray-900">21/04/2025</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Participants:
                </p>
                <p className="mt-1 text-sm text-gray-900">
                  {participants
                    .map((participant: string) => participant)
                    .join(", ")}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600">
              </p>
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="flex md:justify-end">
              <div className="grid grid-cols-3 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    All tasks:
                  </p>
                  <p className="mt-1 text-sm text-gray-900 ">
                    {/* {tasks.todo.length + tasks.inProgress.length + tasks.closed.length + tasks.frozen.length} */}
                    {count.total}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Done:</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {count.completed}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Frozen:</p>
                  <p className="mt-1 text-sm text-gray-900 ">
                    {" "}
                    {count.frozen}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
