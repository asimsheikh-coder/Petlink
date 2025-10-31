"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type DetectionResult = {
  type: "cat" | "dog" | "error"
  breed?: string
  coat?: string
  message?: string
}

type Match = {
  id: string
  image_url: string
  breed: string
  coat: string
  gender: string
  location: string
  owner_name: string
  owner_contact: string
}

export default function UploadPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [detecting, setDetecting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null)
  const [editableDetection, setEditableDetection] = useState({
    type: "",
    breed: "",
    coat: "",
  })
  const [formData, setFormData] = useState({
    gender: "",
    location: "",
    ownerName: "",
    ownerContact: "",
  })
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [matches, setMatches] = useState<Match[]>([])
  const [searching, setSearching] = useState(false)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setDetectionResult(null)
      setEditableDetection({ type: "", breed: "", coat: "" })
      setUploadSuccess(false)
      setMatches([])
    }
  }

  const handleDetect = async () => {
    if (!selectedImage) return

    setDetecting(true)
    try {
      const formData = new FormData()
      formData.append("image", selectedImage)

      const response = await fetch("/api/detect-pet", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
      setDetectionResult(result)
      if (result.type !== "error") {
        setEditableDetection({
          type: result.type,
          breed: result.breed || "",
          coat: result.coat || "",
        })
      }
    } catch (error) {
      console.error("[v0] Detection error:", error)
      setDetectionResult({
        type: "error",
        message: "Failed to detect pet. Please try again.",
      })
    } finally {
      setDetecting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedImage || !editableDetection.type || editableDetection.type === "error") return

    setUploading(true)
    try {
      const submitData = new FormData()
      submitData.append("image", selectedImage)
      submitData.append("petType", editableDetection.type)
      submitData.append("breed", editableDetection.breed)
      submitData.append("coat", editableDetection.coat)
      submitData.append("gender", formData.gender)
      submitData.append("location", formData.location)
      submitData.append("ownerName", formData.ownerName)
      submitData.append("ownerContact", formData.ownerContact)

      const response = await fetch("/api/upload-pet", {
        method: "POST",
        body: submitData,
      })

      if (response.ok) {
        setUploadSuccess(true)
        // Search for matches
        await searchMatches()
      }
    } catch (error) {
      console.error("[v0] Upload error:", error)
      alert("Failed to upload pet. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const searchMatches = async () => {
    if (!editableDetection.type || editableDetection.type === "error") return

    setSearching(true)
    try {
      const params = new URLSearchParams({
        petType: editableDetection.type,
        breed: editableDetection.breed,
        coat: editableDetection.coat,
        gender: formData.gender,
      })

      const response = await fetch(`/api/search-pets?${params}`)
      const data = await response.json()
      setMatches(data.matches || [])
    } catch (error) {
      console.error("[v0] Search error:", error)
    } finally {
      setSearching(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            PetLink
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Upload Your Pet
          </h1>
          <p className="text-gray-600">Upload a photo of your pet and let our AI identify the breed and coat type</p>
        </div>

        {!uploadSuccess ? (
          <Card>
            <CardHeader>
              <CardTitle>Pet Information</CardTitle>
              <CardDescription>Upload a clear photo of your pet to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-4">
                <Label htmlFor="image">Pet Photo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                  {previewUrl ? (
                    <div className="space-y-4">
                      <div className="relative w-full h-64">
                        <Image
                          src={previewUrl || "/placeholder.svg"}
                          alt="Pet preview"
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedImage(null)
                          setPreviewUrl("")
                          setDetectionResult(null)
                          setEditableDetection({ type: "", breed: "", coat: "" })
                        }}
                      >
                        Change Photo
                      </Button>
                    </div>
                  ) : (
                    <label htmlFor="image" className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                      <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
                    </label>
                  )}
                </div>

                {selectedImage && !detectionResult && (
                  <Button
                    onClick={handleDetect}
                    disabled={detecting}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                  >
                    {detecting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Detecting...
                      </>
                    ) : (
                      "Detect Pet"
                    )}
                  </Button>
                )}
              </div>

              {/* Detection Result */}
              {detectionResult && (
                <div
                  className={`p-4 rounded-lg ${
                    detectionResult.type === "error"
                      ? "bg-red-50 border border-red-200"
                      : "bg-green-50 border border-green-200"
                  }`}
                >
                  {detectionResult.type === "error" ? (
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-900">Detection Failed</p>
                        <p className="text-sm text-red-700">{detectionResult.message}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-green-900">Pet Detected!</p>
                        <p className="text-sm text-green-700">
                          AI detected: <span className="font-medium capitalize">{detectionResult.type}</span> • Breed:{" "}
                          <span className="font-medium">{detectionResult.breed}</span> • Coat:{" "}
                          <span className="font-medium">{detectionResult.coat}</span>
                        </p>
                        <p className="text-xs text-green-600 mt-1">You can edit these values below if needed</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Form Fields */}
              {detectionResult && detectionResult.type !== "error" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-semibold text-blue-900">AI Detection Results (Editable)</p>

                    <div className="space-y-2">
                      <Label htmlFor="petType">Pet Type *</Label>
                      <Select
                        value={editableDetection.type}
                        onValueChange={(value) => setEditableDetection({ ...editableDetection, type: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select pet type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dog">Dog</SelectItem>
                          <SelectItem value="cat">Cat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="breed">Breed *</Label>
                      <Input
                        id="breed"
                        placeholder="e.g., Golden Retriever"
                        value={editableDetection.breed}
                        onChange={(e) => setEditableDetection({ ...editableDetection, breed: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coat">Coat Type *</Label>
                      <Input
                        id="coat"
                        placeholder="e.g., Long, Short, Curly"
                        value={editableDetection.coat}
                        onChange={(e) => setEditableDetection({ ...editableDetection, coat: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => setFormData({ ...formData, gender: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="e.g., New York, NY"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner Name *</Label>
                    <Input
                      id="ownerName"
                      placeholder="Your name"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ownerContact">Contact Number *</Label>
                    <Input
                      id="ownerContact"
                      type="tel"
                      placeholder="Your phone number"
                      value={formData.ownerContact}
                      onChange={(e) => setFormData({ ...formData, ownerContact: e.target.value })}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Submit Pet Profile"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="text-xl font-semibold text-green-900">Pet Profile Created Successfully!</h3>
                    <p className="text-green-700">Your pet has been added to our matching system.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Matches */}
            <Card>
              <CardHeader>
                <CardTitle>Potential Matches</CardTitle>
                <CardDescription>
                  {searching
                    ? "Searching for compatible pets..."
                    : matches.length > 0
                      ? `Found ${matches.length} potential match${matches.length > 1 ? "es" : ""}`
                      : "No matches found yet. Check back later!"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {searching ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                  </div>
                ) : matches.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {matches.map((match) => (
                      <Card key={match.id} className="overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={match.image_url || "/placeholder.svg"}
                            alt={`${match.breed} ${match.gender}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2 capitalize">
                            {match.breed} • {match.gender}
                          </h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p>Coat: {match.coat}</p>
                            <p>Location: {match.location}</p>
                            <p>Owner: {match.owner_name}</p>
                            <p>Contact: {match.owner_contact}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No compatible pets found at the moment. More pets will appear as others join!
                  </p>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setSelectedImage(null)
                  setPreviewUrl("")
                  setDetectionResult(null)
                  setEditableDetection({ type: "", breed: "", coat: "" })
                  setUploadSuccess(false)
                  setMatches([])
                  setFormData({
                    gender: "",
                    location: "",
                    ownerName: "",
                    ownerContact: "",
                  })
                }}
                variant="outline"
                className="flex-1"
              >
                Upload Another Pet
              </Button>
              <Button
                onClick={() => (window.location.href = "/")}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
              >
                Back to Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
