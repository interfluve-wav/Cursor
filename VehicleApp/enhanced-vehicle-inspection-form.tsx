import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, ChevronRight, ClipboardCheck, Car, Fuel, MapPin, DollarSign } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function EnhancedVehicleInspectionForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    overallSafetyResult: '',
    overallEmissionsResult: '',
    vin: '',
    licensePlate: '',
    vehicleType: '',
    year: '',
    make: '',
    model: '',
    fuelType: '',
    stationName: '',
    stationAddress: '',
    inspectionFee: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if all required fields are filled
    const requiredFields = ['vin', 'licensePlate', 'year', 'make', 'model', 'stationName', 'stationAddress', 'inspectionFee']
    const missingFields = requiredFields.filter(field => !formData[field])
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`)
      return
    }

    try {
      const response = await fetch('/api/submit-inspection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Inspection report submitted successfully!')
        // Reset form or redirect to a success page
      } else {
        alert('Failed to submit inspection report. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Please try again.')
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <CardTitle className="mb-4">Inspection Results</CardTitle>
            <div className="space-y-4">
              <Label>Overall Safety Result</Label>
              <RadioGroup defaultValue={formData.overallSafetyResult} onValueChange={handleSelectChange('overallSafetyResult')} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PASS" id="safety-pass" className="border-blue-500 text-blue-500" />
                  <Label htmlFor="safety-pass" className="text-white">PASS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FAIL" id="safety-fail" className="border-blue-500 text-blue-500" />
                  <Label htmlFor="safety-fail" className="text-white">FAIL</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-4 mt-4">
              <Label>Overall Emissions Result</Label>
              <RadioGroup defaultValue={formData.overallEmissionsResult} onValueChange={handleSelectChange('overallEmissionsResult')} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PASS" id="emissions-pass" className="border-blue-500 text-blue-500" />
                  <Label htmlFor="emissions-pass" className="text-white">PASS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FAIL" id="emissions-fail" className="border-blue-500 text-blue-500" />
                  <Label htmlFor="emissions-fail" className="text-white">FAIL</Label>
                </div>
              </RadioGroup>
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <CardTitle className="mb-4">Vehicle Information</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vin">VIN <span className="text-red-500">*</span></Label>
                <Input id="vin" name="vin" value={formData.vin} onChange={handleInputChange} required className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licensePlate">License Plate <span className="text-red-500">*</span></Label>
                <Input id="licensePlate" name="licensePlate" value={formData.licensePlate} onChange={handleInputChange} required className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicleType">Vehicle Type</Label>
                <Select onValueChange={handleSelectChange('vehicleType')}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="PASSENGER">PASSENGER</SelectItem>
                    <SelectItem value="COMMERCIAL">COMMERCIAL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year <span className="text-red-500">*</span></Label>
                <Input id="year" name="year" value={formData.year} onChange={handleInputChange} required className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="make">Make <span className="text-red-500">*</span></Label>
                <Input id="make" name="make" value={formData.make} onChange={handleInputChange} required className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model <span className="text-red-500">*</span></Label>
                <Input id="model" name="model" value={formData.model} onChange={handleInputChange} required className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select onValueChange={handleSelectChange('fuelType')}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="GASOLINE">GASOLINE</SelectItem>
                    <SelectItem value="DIESEL">DIESEL</SelectItem>
                    <SelectItem value="ELECTRIC">ELECTRIC</SelectItem>
                    <SelectItem value="HYBRID">HYBRID</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <CardTitle className="mb-4">Inspection Details</CardTitle>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stationName">Station Name <span className="text-red-500">*</span></Label>
                <Input id="stationName" name="stationName" value={formData.stationName} onChange={handleInputChange} required className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stationAddress">Station Address <span className="text-red-500">*</span></Label>
                <Input id="stationAddress" name="stationAddress" value={formData.stationAddress} onChange={handleInputChange} required className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inspectionFee">Inspection Fee <span className="text-red-500">*</span></Label>
                <Input id="inspectionFee" name="inspectionFee" value={formData.inspectionFee} onChange={handleInputChange} required className="bg-gray-800 border-gray-700 text-white" />
              </div>
            </div>
          </motion.div>
        )
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <CardTitle className="mb-4">Summary</CardTitle>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Inspection Results</h3>
                <p>Safety: {formData.overallSafetyResult}</p>
                <p>Emissions: {formData.overallEmissionsResult}</p>
              </div>
              <Separator className="my-4 bg-gray-700" />
              <div>
                <h3 className="font-semibold">Vehicle Information</h3>
                <p>VIN: {formData.vin}</p>
                <p>License Plate: {formData.licensePlate}</p>
                <p>Type: {formData.vehicleType}</p>
                <p>Year: {formData.year}</p>
                <p>Make: {formData.make}</p>
                <p>Model: {formData.model}</p>
                <p>Fuel Type: {formData.fuelType}</p>
              </div>
              <Separator className="my-4 bg-gray-700" />
              <div>
                <h3 className="font-semibold">Inspection Details</h3>
                <p>Station Name: {formData.stationName}</p>
                <p>Station Address: {formData.stationAddress}</p>
                <p>Inspection Fee: ${formData.inspectionFee}</p>
              </div>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Vehicle Inspection Report</CardTitle>
        <div className="flex justify-between items-center mt-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= item ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                {item === 1 && <ClipboardCheck className="w-6 h-6" />}
                {item === 2 && <Car className="w-6 h-6" />}
                {item === 3 && <MapPin className="w-6 h-6" />}
                {item === 4 && <CheckCircle2 className="w-6 h-6" />}
              </div>
              <span className="text-xs mt-1">Step {item}</span>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button type="button" onClick={prevStep} variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                Previous
              </Button>
            )}
            {step < 4 ? (
              <Button type="button" onClick={nextStep} className="ml-auto bg-blue-600 text-white hover:bg-blue-700">
                Next <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" className="ml-auto bg-blue-600 text-white hover:bg-blue-700">
                Submit Inspection Report
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}