# Final Frontend Implementation Plan

## 🎯 Executive Summary

This is the definitive frontend implementation plan for IdEinstein, focusing on building a professional customer portal with excellent UX, real-time updates, and seamless integration with our backend systems.

## 🏗️ Frontend Architecture

### **Technology Stack**

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS + Radix UI components
- **State Management**: React Context + Zustand for complex state
- **Forms**: React Hook Form + Zod validation
- **Authentication**: NextAuth.js with Zoho OAuth
- **Real-time**: WebSocket + Server-Sent Events
- **File Uploads**: Chunked uploads with progress tracking
- **3D Visualization**: Three.js + React Three Fiber (Phase 2)
- **Animations**: Framer Motion
- **Icons**: Lucide React

### **Project Structure**

```
src/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                  # Authentication routes
│   │   ├── signin/
│   │   └── signup/
│   ├── portal/                  # Main customer portal
│   │   ├── dashboard/           # Dashboard overview
│   │   ├── projects/            # Project management
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   └── new/
│   │   ├── billing/             # Invoice and payment management
│   │   │   ├── page.tsx
│   │   │   ├── invoices/
│   │   │   └── payments/
│   │   ├── files/               # File management
│   │   └── profile/             # User profile
│   ├── admin/                   # Admin interface (Phase 3)
│   ├── api/                     # API routes
│   └── globals.css              # Global styles
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components (Radix UI)
│   ├── auth/                    # Authentication components
│   ├── dashboard/               # Dashboard components
│   ├── projects/                # Project-specific components
│   ├── billing/                 # Billing components
│   ├── files/                   # File management components
│   ├── forms/                   # Form components
│   ├── layout/                  # Layout components
│   └── shared/                  # Shared components
├── lib/                         # Utility functions
│   ├── auth.ts                  # NextAuth configuration
│   ├── api.ts                   # API client
│   ├── validations.ts           # Zod schemas
│   ├── utils.ts                 # Helper functions
│   ├── websocket.ts             # WebSocket client
│   └── constants.ts             # Constants
├── hooks/                       # Custom React hooks
│   ├── useAuth.ts
│   ├── useProjects.ts
│   ├── useFiles.ts
│   ├── useRealtime.ts
│   └── usePermissions.ts
├── stores/                      # Zustand stores
│   ├── authStore.ts
│   ├── projectStore.ts
│   ├── notificationStore.ts
│   └── uiStore.ts
├── types/                       # TypeScript definitions
│   ├── auth.ts
│   ├── projects.ts
│   ├── billing.ts
│   └── api.ts
└── styles/                      # Additional styles
    └── components.css
```

## 🔐 Authentication System

### **NextAuth Configuration**

```typescript
// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import { ZohoProvider } from "next-auth/providers/zoho";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    ZohoProvider({
      clientId: process.env.ZOHO_CLIENT_ID!,
      clientSecret: process.env.ZOHO_CLIENT_SECRET!,
      wellKnown: `https://accounts.zoho.${process.env.ZOHO_DOMAIN}/oauth/v2/.well-known/openid_configuration`,
      authorization: {
        params: {
          scope:
            "ZohoCRM.modules.ALL ZohoProjects.portals.ALL ZohoBooks.fullaccess.ALL WorkDrive.files.ALL",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const response = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );

        if (response.ok) {
          const user = await response.json();
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.role = user.role;
        token.accountId = user.accountId;
        token.contactId = user.contactId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub!;
      session.user.role = token.role as string;
      session.user.accountId = token.accountId as string;
      session.user.contactId = token.contactId as string;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },
};
```

### **Authentication Components**

```typescript
// components/auth/SignInForm.tsx
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

type SignInFormData = z.infer<typeof signInSchema>

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })

      if (result?.error) {
        // Handle error
        console.error('Sign in error:', result.error)
      } else {
        // Redirect to dashboard
        window.location.href = '/portal/dashboard'
      }
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In to IdEinstein</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register('email')}
              type="email"
              placeholder="Email"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register('password')}
              type="password"
              placeholder="Password"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => signIn('zoho')}
            disabled={isLoading}
          >
            Sign in with Zoho
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

## 📊 Dashboard Components

### **Main Dashboard**

```typescript
// app/portal/dashboard/page.tsx
'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProjectsOverview } from '@/components/dashboard/ProjectsOverview'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { BillingOverview } from '@/components/dashboard/BillingOverview'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { useProjects } from '@/hooks/useProjects'
import { useRealtime } from '@/hooks/useRealtime'

export default function DashboardPage() {
  const { data: session } = useSession()
  const { projects, isLoading } = useProjects()

  // Setup real-time updates
  useRealtime(session?.user?.accountId)

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <QuickActions />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects?.filter(p => p.status === 'active').length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects?.filter(p => p.status === 'completed').length || 0}
            </div>
          </CardContent>
        </Card>

        <BillingOverview />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ProjectsOverview projects={projects} />
        <RecentActivity />
      </div>
    </div>
  )
}
```

### **Projects Overview Component**

```typescript
// components/dashboard/ProjectsOverview.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Project } from '@/types/projects'

interface ProjectsOverviewProps {
  projects?: Project[]
}

export function ProjectsOverview({ projects = [] }: ProjectsOverviewProps) {
  const recentProjects = projects.slice(0, 5)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Projects</CardTitle>
        <Button asChild size="sm">
          <Link href="/portal/projects/new">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentProjects.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <p>No projects yet</p>
              <Button asChild className="mt-2">
                <Link href="/portal/projects/new">Create your first project</Link>
              </Button>
            </div>
          ) : (
            recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{project.name}</h4>
                    <Badge variant={getStatusVariant(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={project.progressPercentage} className="flex-1" />
                    <span className="text-sm text-muted-foreground">
                      {project.progressPercentage}%
                    </span>
                  </div>
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/portal/projects/${project.id}`}>View</Link>
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case 'active': return 'default'
    case 'completed': return 'success'
    case 'on_hold': return 'warning'
    case 'cancelled': return 'destructive'
    default: return 'secondary'
  }
}
```

## 📁 Project Management

### **Project List Page**

```typescript
// app/portal/projects/page.tsx
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Plus, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import { useProjects } from '@/hooks/useProjects'
import { ProjectFilters } from '@/components/projects/ProjectFilters'

export default function ProjectsPage() {
  const { projects, isLoading } = useProjects()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (isLoading) {
    return <ProjectsSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button asChild>
          <Link href="/portal/projects/new">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <ProjectFilters
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects?.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge variant={getStatusVariant(project.status)}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{project.progressPercentage}%</span>
                </div>
                <Progress value={project.progressPercentage} />
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                <span>{project.files?.length || 0} files</span>
              </div>

              <Button asChild className="w-full">
                <Link href={`/portal/projects/${project.id}`}>
                  View Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects?.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== 'all'
                ? 'No projects match your filters'
                : 'No projects yet'
              }
            </p>
            <Button asChild>
              <Link href="/portal/projects/new">Create your first project</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
```

### **Project Details Page**

```typescript
// app/portal/projects/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProjectOverview } from '@/components/projects/ProjectOverview'
import { ProjectFiles } from '@/components/projects/ProjectFiles'
import { ProjectTimeline } from '@/components/projects/ProjectTimeline'
import { ProjectTeam } from '@/components/projects/ProjectTeam'
import { useProject } from '@/hooks/useProject'

export default function ProjectDetailsPage() {
  const params = useParams()
  const projectId = params.id as string
  const { project, isLoading } = useProject(projectId)

  if (isLoading) {
    return <ProjectDetailsSkeleton />
  }

  if (!project) {
    return <ProjectNotFound />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        <Badge variant={getStatusVariant(project.status)} className="text-sm">
          {project.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{project.progressPercentage}%</span>
              </div>
              <Progress value={project.progressPercentage} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Started</p>
              <p className="font-medium">{new Date(project.createdAt).toLocaleDateString()}</p>
              {project.dueDate && (
                <>
                  <p className="text-sm text-muted-foreground mt-2">Due Date</p>
                  <p className="font-medium">{new Date(project.dueDate).toLocaleDateString()}</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{project.files?.length || 0}</p>
              <p className="text-sm text-muted-foreground">Total files uploaded</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ProjectOverview project={project} />
        </TabsContent>

        <TabsContent value="files">
          <ProjectFiles projectId={project.id} files={project.files} />
        </TabsContent>

        <TabsContent value="timeline">
          <ProjectTimeline project={project} />
        </TabsContent>

        <TabsContent value="team">
          <ProjectTeam project={project} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

## 📁 File Management System

### **File Upload Component**

```typescript
// components/files/FileUpload.tsx
'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Upload, X, File, CheckCircle, AlertCircle } from 'lucide-react'
import { useFileUpload } from '@/hooks/useFileUpload'

interface FileUploadProps {
  projectId: string
  onUploadComplete?: (files: UploadedFile[]) => void
  maxFiles?: number
  maxSize?: number // in bytes
  acceptedTypes?: string[]
}

export function FileUpload({
  projectId,
  onUploadComplete,
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024 * 1024, // 5GB
  acceptedTypes = ['.dwg', '.step', '.stp', '.iges', '.igs', '.pdf', '.zip']
}: FileUploadProps) {
  const [uploadQueue, setUploadQueue] = useState<FileUploadItem[]>([])
  const { uploadFile, isUploading } = useFileUpload()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newUploads = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'pending' as const,
      error: null
    }))

    setUploadQueue(prev => [...prev, ...newUploads])

    // Start uploading files
    for (const upload of newUploads) {
      try {
        setUploadQueue(prev => prev.map(item =>
          item.id === upload.id
            ? { ...item, status: 'uploading' }
            : item
        ))

        await uploadFile({
          file: upload.file,
          projectId,
          onProgress: (progress) => {
            setUploadQueue(prev => prev.map(item =>
              item.id === upload.id
                ? { ...item, progress }
                : item
            ))
          }
        })

        setUploadQueue(prev => prev.map(item =>
          item.id === upload.id
            ? { ...item, status: 'completed', progress: 100 }
            : item
        ))
      } catch (error) {
        setUploadQueue(prev => prev.map(item =>
          item.id === upload.id
            ? { ...item, status: 'error', error: error.message }
            : item
        ))
      }
    }

    // Call completion callback
    const completedFiles = uploadQueue.filter(item => item.status === 'completed')
    if (completedFiles.length > 0 && onUploadComplete) {
      onUploadComplete(completedFiles.map(item => ({
        id: item.id,
        name: item.file.name,
        size: item.file.size,
        type: item.file.type
      })))
    }
  }, [projectId, uploadFile, onUploadComplete, uploadQueue])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept: acceptedTypes.reduce((acc, type) => {
      acc[type] = []
      return acc
    }, {} as Record<string, string[]>)
  })

  const removeFromQueue = (id: string) => {
    setUploadQueue(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            {isDragActive ? (
              <p className="text-lg">Drop the files here...</p>
            ) : (
              <div>
                <p className="text-lg mb-2">Drag & drop files here, or click to select</p>
                <p className="text-sm text-muted-foreground">
                  Supports: {acceptedTypes.join(', ')} (Max {maxFiles} files, {formatFileSize(maxSize)} each)
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {uploadQueue.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Upload Queue</h3>
            <div className="space-y-3">
              {uploadQueue.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <File className="h-5 w-5 text-muted-foreground" />

                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(item.file.size)}
                    </p>

                    {item.status === 'uploading' && (
                      <div className="mt-2">
                        <Progress value={item.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.progress}% uploaded
                        </p>
                      </div>
                    )}

                    {item.status === 'error' && (
                      <p className="text-sm text-red-600 mt-1">{item.error}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status === 'completed' && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {item.status === 'error' && (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    {item.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromQueue(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
```

## 🔄 Real-time Updates

### **WebSocket Hook**

```typescript
// hooks/useRealtime.ts
"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useNotificationStore } from "@/stores/notificationStore";
import { useProjectStore } from "@/stores/projectStore";

export function useRealtime(accountId?: string) {
  const { data: session } = useSession();
  const wsRef = useRef<WebSocket | null>(null);
  const { addNotification } = useNotificationStore();
  const { updateProject, invalidateProjects } = useProjectStore();

  useEffect(() => {
    if (!session?.user || !accountId) return;

    // Connect to WebSocket
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/ws?accountId=${accountId}&token=${session.accessToken}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleRealtimeUpdate(data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        if (session?.user && accountId) {
          // Reconnect logic here
        }
      }, 5000);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [session, accountId]);

  const handleRealtimeUpdate = (data: RealtimeUpdate) => {
    switch (data.type) {
      case "project_update":
        updateProject(data.projectId, data.updates);
        addNotification({
          type: "info",
          title: "Project Updated",
          message: `Project ${data.projectName} has been updated`,
          actionUrl: `/portal/projects/${data.projectId}`,
        });
        break;

      case "invoice_update":
        addNotification({
          type: "success",
          title: "Invoice Updated",
          message: `Invoice ${data.invoiceNumber} status: ${data.status}`,
          actionUrl: `/portal/billing/invoices/${data.invoiceId}`,
        });
        break;

      case "file_uploaded":
        addNotification({
          type: "info",
          title: "File Uploaded",
          message: `New file uploaded: ${data.filename}`,
          actionUrl: `/portal/projects/${data.projectId}`,
        });
        invalidateProjects();
        break;

      default:
        console.log("Unknown realtime update type:", data.type);
    }
  };

  return {
    isConnected: wsRef.current?.readyState === WebSocket.OPEN,
  };
}
```

## 📱 Responsive Design

### **Mobile-First Approach**

```typescript
// hooks/useMediaQuery.ts
"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

// Usage in components
export function useBreakpoint() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  return { isMobile, isTablet, isDesktop };
}
```

## 🎨 Theme System

### **Theme Configuration**

```typescript
// lib/theme.ts
export const theme = {
  colors: {
    primary: {
      50: "#eff6ff",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      900: "#1e3a8a",
    },
    secondary: {
      50: "#fefce8",
      500: "#eab308",
      600: "#ca8a04",
      700: "#a16207",
    },
    success: {
      50: "#f0fdf4",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
    },
    warning: {
      50: "#fffbeb",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
    },
    error: {
      50: "#fef2f2",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
    },
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
  },
};
```

## 🚀 Adjusted Implementation Phases (Based on Current State)

### **Phase 1: Enhancement & Security (Weeks 1-2)**
*Enhancing existing portal with security and real-time features*

#### **Week 1: Security & Performance**
- ✅ Add RBAC to existing portal components
- ✅ Implement real-time updates to existing dashboard
- ✅ Enhance existing authentication with better UX
- ✅ Add loading states and error handling to existing components

#### **Week 2: User Experience**
- ✅ Enhance existing file upload with progress tracking
- ✅ Add notifications to existing portal
- ✅ Improve existing mobile responsiveness
- ✅ Add accessibility features to existing components

### **Phase 2: Advanced Features (Weeks 3-4)**
*Adding business intelligence and advanced functionality*

#### **Week 3: Analytics & Reporting**
- ✅ Add analytics charts to existing dashboard
- ✅ Implement reporting interface
- ✅ Add advanced filtering to existing project/billing lists
- ✅ Enhance existing search functionality

#### **Week 4: Premium Features**
- ✅ Add 3D file preview (optional)
- ✅ Implement bulk operations for existing interfaces
- ✅ Add advanced project management features
- ✅ Enhance existing admin interface

### **Phase 3: Optimization & Polish (Weeks 5-6)**
*Optimizing existing system for production*

#### **Week 5: Performance Optimization**
- ✅ Optimize existing component performance
- ✅ Implement advanced caching strategies
- ✅ Add PWA features to existing app
- ✅ Optimize existing bundle size

#### **Week 6: Final Polish**
- ✅ Add advanced animations and transitions
- ✅ Implement comprehensive testing
- ✅ Add monitoring and analytics
- ✅ Final deployment preparation

## 📊 Performance Optimization

### **Key Optimizations**

- ✅ Code splitting with Next.js dynamic imports
- ✅ Image optimization with Next.js Image component
- ✅ Lazy loading for non-critical components
- ✅ React Query for efficient data fetching and caching
- ✅ Virtual scrolling for large lists
- ✅ Debounced search inputs
- ✅ Optimistic updates for better UX
- ✅ Service worker for offline capabilities

### **Bundle Size Monitoring**

```typescript
// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
});
```

This comprehensive frontend implementation plan provides a clear roadmap for building a professional, responsive, and feature-rich customer portal that integrates seamlessly with our backend systems.
