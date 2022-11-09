import { useEffect } from "react";

const Attendance = () => {
  const days:any[] = []
  let i = 0

  for(i;i<31;i++){
    days.push(0)
  }


  console.log(days);
  
  return (
    <div className="tw-flex tw-flex-col">
      <div className="tw-overflow-x-auto sm:-tw-mx-6 lg:-tw-mx-8">
        <div className="tw-py-2 tw-inline-block tw-min-w-full sm:tw-px-6 lg:tw-px-8">
          <div className="tw-overflow-hidden">
            <table className="tw-min-w-full">
              <thead className="tw-bg-white tw-border-b">
                <tr>
                  <th
                    scope="col"
                    className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"
                  >
                    S.No
                  </th>
                  <th
                    scope="col"
                    className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"
                  >
                    RollNO
                  </th>
                  <th
                    scope="col"
                    className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"
                  >
                    StudentName
                  </th>
                  <th
                    scope="col"
                    className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"
                  >
                    {
                      <select>
                        return (
                        <option className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"></option>
                        );
                      </select>
                    }
                  </th>
                  {days.length > 30 && days.map((value, index) => {
                    return (
                      <th
                      key={index}
                        scope="col"
                        className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"
                      >
                        {
                            index+1
                        }
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr className="tw-bg-white tw-border-b tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-100">
                  <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900"></td>
                  <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap"></td>
                  <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap"></td>
                  <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap"></td>
                  <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
