import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function ConfigurationPage() {
  return (
    <div className="bg-orange-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50 min-h-screen flex items-center justify-center">
      <Card className="w-[400px] shadow-lg rounded-md border border-orange-300">
        <CardHeader className="text-center">
          <CardTitle className="text-orange-700 text-xl font-bold">
            Configuration Page
          </CardTitle>
          <CardDescription className="text-gray-700 dark:text-gray-300">
            Welcome to Configuration Page. Select from the following options:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-6">
            <Link to={"/newConfiguration"} className="w-full">
              <Button className="px-4 py-2 bg-orange-500 text-white rounded-md w-full hover:bg-orange-600 focus:ring-2 focus:ring-orange-500">
                Add New Configuration Settings
              </Button>
            </Link>
            <Link to={"/vendor-details"} className="w-full">
              <Button className="px-4 py-2 bg-orange-500 text-white rounded-md w-full hover:bg-orange-600 focus:ring-2 focus:ring-orange-500">
                Add Previous Configuration Settings
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ConfigurationPage;