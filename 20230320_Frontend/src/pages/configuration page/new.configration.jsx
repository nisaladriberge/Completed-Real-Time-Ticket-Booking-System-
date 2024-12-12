import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function NewConfig() {
  const [totalTickets, setTotalTickets] = useState("");
  const [ticketReleaseRate, setTicketReleaseRate] = useState("");
  const [ticketRetrievalRate, setTicketRetrievalRate] = useState("");
  const [maximumTicketCapacity, setMaximumTicketCapacity] = useState("");

  const handleInputChange = (e, setState) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setState(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      totalTickets,
      ticketReleaseRate,
      ticketRetrievalRate,
      maximumTicketCapacity,
    };

    try {
      const response = await axios.post("http://localhost:8080/write-config-json", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Form submitted with:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleReset = () => {
    setTotalTickets("");
    setTicketReleaseRate("");
    setTicketRetrievalRate("");
    setMaximumTicketCapacity("");
  };

  return (
    <div className="bg-orange-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50 min-h-screen flex items-center justify-center">
      <Card className="w-[350px] shadow-lg rounded-lg bg-white dark:bg-gray-800">
        <form onSubmit={onSubmit}>
          <CardHeader className="text-center">
            <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">
              Configuration Setup
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Fill the following Configuration Setting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="totalTickets" className="text-gray-800 dark:text-gray-200">
                  Enter total tickets available:
                </Label>
                <Input
                  id="totalTickets"
                  value={totalTickets}
                  onChange={(e) => handleInputChange(e, setTotalTickets)}
                  placeholder="Enter ticket amount"
                  className="bg-orange-50 text-gray-900 dark:bg-gray-700 dark:text-white rounded-md border-orange-300 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="ticketReleaseRate" className="text-gray-800 dark:text-gray-200">
                  Enter ticket release rate per minute:
                </Label>
                <Input
                  id="ticketReleaseRate"
                  value={ticketReleaseRate}
                  onChange={(e) => handleInputChange(e, setTicketReleaseRate)}
                  placeholder="Enter release rate"
                  className="bg-orange-50 text-gray-900 dark:bg-gray-700 dark:text-white rounded-md border-orange-300 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="ticketRetrievalRate" className="text-gray-800 dark:text-gray-200">
                  Enter customer retrieval rate per minute:
                </Label>
                <Input
                  id="ticketRetrievalRate"
                  value={ticketRetrievalRate}
                  onChange={(e) => handleInputChange(e, setTicketRetrievalRate)}
                  placeholder="Enter retrieve rate"
                  className="bg-orange-50 text-gray-900 dark:bg-gray-700 dark:text-white rounded-md border-orange-300 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="maximumTicketCapacity" className="text-gray-800 dark:text-gray-200">
                  Enter max ticket capacity:
                </Label>
                <Input
                  id="maximumTicketCapacity"
                  value={maximumTicketCapacity}
                  onChange={(e) => handleInputChange(e, setMaximumTicketCapacity)}
                  placeholder="Enter ticket capacity"
                  className="bg-orange-50 text-gray-900 dark:bg-gray-700 dark:text-white rounded-md border-orange-300 focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pb-1">
            <Button
              variant="outline"
              className="bg-orange-100 text-orange-800 dark:bg-orange-600 dark:text-white rounded-md hover:bg-orange-200 dark:hover:bg-orange-500"
              onClick={handleReset}
            >
              Reset
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
              <Link to= "/vendor-details">
                <Button className="bg-orange-500 text-white rounded-md hover:bg-orange-600 dark:bg-orange-700 dark:hover:bg-orange-800">
                  Setup
                </Button>
              </Link>  
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-gray-900 dark:text-white">
                    Are you sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
                    This action will replace previous configurations on the server.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-gray-500 hover:text-gray-800">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="text-orange-500 hover:text-orange-600"
                    onClick={onSubmit}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
          <div className="mt-4 text-center text-sm pb-6">
            To use previously added Configuration -{" "}
            <Link to={"/configuration"} className="text-orange-500 hover:underline">
              Click here
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default NewConfig;