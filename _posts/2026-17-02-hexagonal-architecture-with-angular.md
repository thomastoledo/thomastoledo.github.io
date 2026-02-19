---
layout: post
title:  "Hexagonal Architecture with Angular"
date:   2026-02-17 00:00:00 +0100
categories: [formation, angular, typescript, javascript, training]
---

# Hexagonal Architecture in Angular - A Practical, Minimal Use Case
In today's article, we are gonna learn a bit more about hexagonal architecture with Angular. This article is for people who are curious about hexagonal architecture and already know about Angular.

## The structural Drift of Growing Angular Applications
Angular applications rarely collapse overnight. They drift.

At the beginning, the structure is clean: a component, a service, an HTTP call. The responsibilities feel obvious. Over time, features accumulate. Deadlines compress. The code adapts locally to solve immediate problems. Gradually, architecture dissolves into convenience.

### Business Logic Leaking into Components and Services
Components start by handling view concerns: rendering, user interaction, state binding. Soon, validation rules appear in the component. Then conditional business flows. Then domain invariants expressed as if statements directly inside submit() methods. Services follow the same trajectory. What begins as a thin HTTP wrapper becomes a hybrid object:
- Performs API calls
- Transforms DTOs
- Applies business rules
- Makes decisions
- Mutates UI-facing state

The result is not a clear separation between domain and infrastructure. It is an accidental aggregation of responsibilities. Logic is scattered. No single place expresses the business model coherently.

### Tight Coupling Between UI, HTTP, and Domain Logic
When a component imports HttpClient, or a service mixes domain decisions with transport details, coupling becomes structural. Three layers collapse into one:
- UI layer (Angular components)
- Infrastructure layer (HTTP, storage)
- Domain rules (business invariants)

This creates implicit dependencies:
Changing the API contract forces changes inside business logic.
Changing a validation rule requires editing a component.
Replacing HTTP with another transport requires refactoring core logic.

The system becomes brittle because boundaries are absent.

### Difficult Unit Testing: TestBed Everywhere

Architecture reveals itself in testing friction. If validating a simple business rule requires:
- Angular TestBed
- HttpClient testing module
- Dependency injection scaffolding
- Asynchronous zone handling

then business logic is framework-bound.

Tests become slow and heavy because they boot part of Angular to verify domain behavior. The signal is clear: the framework is entangled with the core. Pure domain logic should be testable with:
- Plain TypeScript
- No Angular imports
- No dependency injection container
- No HTTP mocking infrastructure

When this is not possible, the architecture is already compromised.

### Hard-to-Replace Infrastructure

The final symptom appears during change. An API evolves. A backend endpoint moves. A storage mechanism changes. A feature must support offline mode. In a tightly coupled Angular application:
- API response shapes are referenced directly in components.
- HTTP error handling is mixed with domain decisions.
- Infrastructure details are assumed by core logic.

Replacing infrastructure becomes invasive. What should be localized changes propagate across the codebase.
The core problem is not Angular itself. It is the absence of architectural boundaries.

## What is hexagonal architecure?
Hexagonal architecture, also known as Ports and Adapters, is a structural pattern designed to protect the core of an application from external volatility.

It is not tied to Angular.
It is not tied to frontend or backend.
It is a way to enforce architectural boundaries.

The core idea is simple: the business logic must not depend on technical details.

### Also Called Ports and Adapters

The term hexagonal is visual. The shape emphasizes that the system can have multiple entry and exit points. The functional meaning is clearer in the alternative name:
- Ports define what the core needs.
- Adapters implement those needs using specific technologies.

Ports are interfaces and Adapters are concrete implementations. The Ports allow to interact with the domain and the intention, and the Adapters express how to interact with it. They implement the intention. For instance, if you have an app for managing tickets, and you have an hexagonal architecture, then you might have a Port called `CreateTicketPort`, another one called `GetTicketPort`, etc. This would work in a CRUD-heavy application, and this is why you could also have a more global Port called `TicketPort`.
We can even split queries and commands. A practical rule in Angular I like to follow is to start with a more global Port, that I will then split when it starts accumulating many queries or methods.
In this article let's say we have a Port for each CRUD operation. We could have:

```ts
export interface CreateTicketPort {
  create(ticket: Ticket): Promise<void>;
}

export interface GetTicketPort {
  getById(id: string): Promise<Ticket | null>;
}

export interface UpdateTicketPort {
  update(ticket: Ticket): Promise<void>;
}

export interface DeleteTicketPort {
  delete(id: string): Promise<void>;
}
```

Those Ports express the intention, i.e what we can do with the Domain. You can see they are still plain TypeScript. There is no sign of Angular, here. Adapters, on the other hand, can be of any implementation, in any framework/library.
In this article, we collapse CRUD ports into a single repository port for simplicity. In larger systems, you may prefer use-case-specific ports or a CQRS split.

### Domain at the Center
At the center lies the domain:
- Entities => have identity and lifecycle
- Value objects => have **no** identity and are usually immutable
- Business rules
- Invariants => conditions that must always hold true for an entity to be valid.

For instance :

```ts
// This is an entity
// Two tickets with the same content
// will differ if they have a different id
interface Ticket {
  id: string;
  trackingId: string;
  email: Email;
  subject: string;
  description: string;
  createdAt: Date;
}

// Email is a value object
// It has immutable behaviours. It does not hold any identity in our domain
type EmailValidationError = 'EMPTY' | 'INVALID_FORMAT';

class Email {
  private constructor(private readonly value: string) {}

  static create(raw: string): Email {
    const { ok, value, error } = this.tryCreate(raw);
    if (!ok) {
      throw new Error(`Invalid email: ${error}`);
    }
    return value!;
  }
  
  static tryCreate(raw: string): { ok: boolean; value?: Email; error?: EmailValidationError } {
    if (!raw || raw.trim().length === 0) return { ok: false, error: 'EMPTY' };

    const normalized = raw.trim().toLowerCase();
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_REGEX.test(normalized)) return { ok: false, error: 'INVALID_FORMAT' };

    return { ok: true, value: new Email(normalized) };
  }

  getValue(): string {
    return this.value;
  }
}


```

The domain expresses the language of the business. It contains no framework imports, no HTTP calls, no UI references. It must be stable.

### Application Layer Orchestrates Use Cases

We just saw the domain and what it was, theoretically - we will get to a concrete example further in this article. Around the domain sits the application layer. This layer defines:
- Use cases
- command/response models
- Coordination between domain and ports

It orchestrates workflows but does not implement infrastructure details.

For instance:
It may require a repository.
It may require the current time.
It may require an ID generator.

=> It expresses those requirements as ports.

We said before that ports were interfaces, and that the core would depend on them. You can see it like that:

The core contains the domain and the application layer. The domain depends on nothing and can be pure TypeScript. The application layer exposes use cases (the core’s API) and defines ports (interfaces) for anything it needs from the outside world. Ports express contracts without committing to a technology. Adapters implement those ports and are the only place tied to technical constraints (Angular services, HttpClient, browser APIs, etc.). This lets you keep the core framework-agnostic while plugging different UI adapters (Angular, React) or infrastructure adapters around it.

### Infrastructure Implements External Concerns
Infrastructure lives outside the core. It handles:
- HTTP communication
- Database persistence
- Local storage
- System clock
- UUID generation

These are technical concerns. They are expected to change. The Infrastructure layer implements the ports defined by the application layer.
It is replaceable by design.

### UI Is Just an Adapter
In Angular, components belong to the outer layer.
They:
- Collect user input
- Invoke use cases
- Render results

They do not contain business rules.
Angular becomes an input/output mechanism, not the foundation of the architecture.

### The Dependency Rule
The rule that enforces the structure is strict: dependencies point inward. Infrastructure depends on application and domain. Application depends on domain. Domain depends on nothing external. The domain knows nothing about:

- Angular
- HttpClient
- Databases
- REST
- Browser APIs

It only knows business concepts.

This inversion is the essential property of hexagonal architecture: the framework becomes a detail. The business remains the core.

## The Use Case: Create a Support Ticket
To make hexagonal architecture concrete, we need a use case that is small, realistic, and still exposes real domain constraints. "Create a support ticket" fits: it has input validation, a rate-limit business rule, persistence, and a clear outcome.

### Scenario
A user opens a "Contact Support" form and submits three fields:

* **Subject**: a short summary of the issue
* **Description**: the detailed message
* **Email**: the address support will respond to

They click **Create Ticket**, and the system returns a ticket identifier that can be displayed immediately (or used for follow-up tracking).

### Business Rules
This use case enforces three rules that are common in real products:

1. **Subject must not be empty**
   A ticket without a subject is not actionable and becomes noise in the support queue.

2. **Description must be at least 20 characters**
   Prevents low-signal messages ("help", "bug", "it doesn’t work") that force unnecessary back-and-forth.

3. **Maximum 3 tickets per hour per email**
   Rate limiting as a business rule. This avoids spam, prevents accidental loops, and protects the support system from abuse. This will be handled by the backend.

4. **A ticket has a status: open, in progress, closed**
  This allows for tracking the ticket.

These rules are deliberately simple, but they illustrate the key point: the core is making decisions that should not depend on Angular, HTTP, or any storage detail.

### Goal of the Use Case

The use case has a clean, deterministic contract:

1. **Validate** input (subject, description, email)
2. **Create** a `Ticket` domain object (with ID and timestamp)
3. **Persist** it through a port (repository abstraction)
4. **Return** the generated **Ticket** to the caller

This is where hexagonal architecture becomes visible: the use case defines *what it needs* (ports) and orchestrates the workflow, while the outside world (Angular UI, HTTP API, database) is pushed to adapters.

## Project Structure
A clean hexagonal implementation in Angular is not about complexity. It is about separating responsibilities with precision.
A minimal structure for our "Create Ticket" feature can look like this:

```
src/
  app/
    domain/
    application/
      ports/
      use-cases/
    infrastructure/
      adapters/
    ui/
```

Each folder represents a distinct architectural role. The structure is intentional: it encodes dependency direction.


## Setting up your project
We start by setting up a new Angular project:

```shell
# install angular CLI if you do not have it
npm install -g @angular/cli

# then create your app
ng new ticketing-app

```

And now, we can focus on each layer.

## Domain => Business Concepts and Rules

The **domain** is the core.

It contains:

* Entities (`Ticket`)
* Value Objects (`Email`)
* Business rules (validation, invariants)
* Pure domain logic

Characteristics:

* No Angular imports
* No HttpClient
* No Date generation logic tied to system APIs
* No persistence awareness

The domain models the business reality. It must be framework-agnostic and stable.

So let's do it!
Create a directory in your Angular app. Under `src/app`, create a `domain` directory and, in `domain`, create the following sub-directories:
- `entities`
- `value-objects`

#### `entities`
There goes the `Ticket.ts` file:

```ts
import { Email } from "../value-objects/Email";
export interface Ticket {
  id: string;
  trackingId: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  email: Email;
  createdAt: Date;
  updatedAt?: Date;
}

// We also add a convenient type for ticket creation
export type NewTicket = Omit<Ticket, 'id' | 'trackingId' | 'status' | 'createdAt' | 'updatedAt'>;

```

#### `value-objects`
In this directory, we add one files:
- Email.ts

```ts
export type EmailValidationError = 'EMPTY' | 'INVALID_FORMAT';

export class Email {
  private constructor(private readonly value: string) {}

  static create(raw: string): Email {
    const { ok, value, error } = this.tryCreate(raw);
    if (!ok) {
      throw new Error(`Invalid email: ${error}`);
    }
    return value!;
  }
  
  static tryCreate(raw: string): { ok: boolean; value?: Email; error?: EmailValidationError } {
    if (!raw || raw.trim().length === 0) return { ok: false, error: 'EMPTY' };

    const normalized = raw.trim().toLowerCase();
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_REGEX.test(normalized)) return { ok: false, error: 'INVALID_FORMAT' };

    return { ok: true, value: new Email(normalized) };
  }

  getValue(): string {
    return this.value;
  }
}

```

We have our Domain. For now, it's sufficient.

## Application => Use Cases and Ports

The **application layer** orchestrates behavior.

It contains:

* Use cases (`CreateTicketUseCase`)
* Port interfaces (`TicketRepositoryPort`)
* Command/Result models

Responsibilities:

* Coordinate domain objects
* Enforce workflow
* Express what the system needs from the outside world

It does not:

* Implement HTTP
* Access databases
* Manipulate Angular state

The application layer defines contracts. It depends only on the domain.

So let's get to it!

### Writing ports
Let's start by going under the `src/app` folder and, inside of it, create the `application/ports` directory.
Inside of it, create the following file:
- `TicketRepositoryPort` => to create a ticket

#### `TicketRepositoryPort`

```ts
export interface TicketRepositoryPort {
  create(ticket: NewTicket): Promise<Ticket>;
}
```

You may notice that the port returns a `Promise` instead of an `Observable`: this is intentional.

A port belongs to the core of the application. The core must remain framework-agnostic. `Observable` is part of RxJS, which is tied to Angular’s ecosystem. If we expose `Observable` in the port, we introduce a framework dependency into the core.

`Promise`, on the other hand, is part of the JavaScript standard. It represents a single asynchronous result, which matches the nature of a use case like `createTicket`: execute once, wait for completion, return.

The adapter is free to use `HttpClient` and `Observable` internally. It can convert the stream to a `Promise` before returning to the core.
This keeps RxJS in the infrastructure layer and preserves the boundary.

An Observable becomes appropriate when the domain itself models a stream of events, not a single operation.

Examples:
- Subscribing to real-time ticket updates (WebSocket, gRPC)
- Listening to status changes over time
- Receiving a continuous feed of notifications
- Streaming live metrics or logs

In those cases, the reactive nature is part of the business requirement. The stream is not an infrastructure detail; it is a domain concept.

Use Promise for one-shot operations.
Use Observable when the behavior is inherently continuous or event-driven.



Here is the section you can insert under:

```
### Writing use cases
#### `CreateTicketUseCase`
```

---

### Writing use cases

#### `CreateTicketUseCase`

We now have:

* A **Domain** (`Ticket`, `Email`)
* A **Port** (`TicketRepositoryPort`)
* Soon enough, we will have an **Adapter** that implements the port

What is missing is the orchestration layer: the **use case**.

The use case is the heart of the application layer.
It coordinates domain objects and ports. It contains workflow logic.
It does not depend on Angular. It does not know about HTTP.

Under `src/app/application/use-cases`, create a new file:

* `CreateTicketUseCase.ts`

```ts
import { TicketRepositoryPort } from "../ports/TicketRepositoryPort";
import { NewTicket, Ticket } from "../../domain/entities/Ticket";
import { Email } from "../../domain/value-objects/Email";

export interface CreateTicketCommand {
    title: string;
    description: string;
    email: string;
}

export class CreateTicketUseCase {

  constructor(
      private readonly ticketRepository: TicketRepositoryPort
  ) { }

  async execute(command: CreateTicketCommand): Promise<Ticket> {
    // 1. Validate and construct Value Objects
    if (!command.title || command.title.trim().length === 0) {
        throw new Error("Title cannot be empty.");
    }

    if (command.description.trim().length < 20) {
        throw new Error("Description must be at least 20 characters.");
    }

    const { ok, value: email } = Email.tryCreate(command.email);

    if (!ok) {
        throw new Error("Invalid email address.");
    }

    // 2. Build the domain input
    const newTicket: NewTicket = {
        title: command.title.trim(),
        description: command.description.trim(),
        email: email!,
    };

    // 3. Persist through the port
    const createdTicket = await this.ticketRepository.create(newTicket);

    // 4. Return the result
    return createdTicket;
  }
}
```

Let’s analyze what is happening here.

* The use case receives a **command** (plain data, coming from UI).
* It performs validation.
* It constructs domain objects (`Email`).
* It calls the repository through the **port**.
* It returns the resulting domain `Ticket`.

There is:

* No Angular import
* No HttpClient
* No Observable
* No framework-specific code

This class can be tested with plain TypeScript.

### Why This Matters

The component will later inject and call this use case.

But the use case itself:

* Does not know that Angular exists.
* Does not know how persistence is implemented.
* Does not know whether the repository uses HTTP, IndexedDB, or something else.

It only depends on the **contract** (`TicketRepositoryPort`).

This is the moment where hexagonal architecture becomes concrete: the application layer orchestrates the domain and communicates with the outside world only through ports.

That is the core boundary.

## Infrastructure => Technical Implementations
Now that we have our Ports and Use Cases, we can implement the Adapters in the **infrastructure layer**.
The **infrastructure layer** implements the ports declared in the application layer.

It contains adapters such as:

* `HttpTicketRepositoryAdapter`

Its responsibilities:

* Translate domain objects to DTOs
* Perform HTTP calls
* Access storage
* Integrate external APIs

This is the only layer that depends on frameworks or technical details. It depends inward on the application layer.

Under `src/app`, create the `infrastructure/adapters` directory. Inside of it, create the following file:
- `HttpTicketRepositoryAdapter.ts`

### `HttpTicketRepositoryAdapter.ts`
Here is a first implementation, but do not take it yet, because it is flawed.

```ts
import { inject, Injectable } from "@angular/core";
import { TicketRepositoryPort } from "../../application/ports/TicketRepositoryPort";
import { NewTicket, Ticket } from "../../domain/entities/Ticket";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Injectable()
export class HttpTicketRepositoryAdapter implements TicketRepositoryPort {
    private readonly httpClient: HttpClient = inject(HttpClient);
    async create(ticket: NewTicket): Promise<Ticket> {
        await firstValueFrom(this.httpClient.post<void>("/api/tickets", ticket));
    }
}
```

So what do we see here?
Our Adapter properly implements the Port, and returns a Promise. In order to do so, it makes a proper use of `firstValueFrom`, the `RxJs` operator. Also, it uses `httpClient`; therefore, we are here using Angular DI mechanism. We could have made another implementation. For instance:

```ts
import { TicketRepositoryPort } from "../../application/ports/TicketRepositoryPort";
import { Ticket } from "../../domain/entities/Ticket";

export class HttpTicketRepositoryAdapter implements TicketRepositoryPort {
    async create(ticket: Ticket): Promise<Ticket> {
        await fetch("/api/tickets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ticket),
        });
    }
}
```

This means we **do not necessarily** have to use an Angular service, although it would be kind of a waste not to. Anyway, back to our Angular service: there are some things to fix in this first implementation!
The main problem is: we **send the domain entity** directly over HTTP! The Domain **should not leak** into the transport layer. The Adapter should translate the Entity to DTO. So where should we store the DTO? And whose role it is to do the mapping between the Entity and the DTO?

**Where to store the DTO**
The DTO can be stored inside a `dto` directory. We could have the following structure:
```
infrastructure/
  adapters/
    dtos/
      create-ticket-request.dto.ts
      ticket-response-dto.ts
    http-ticket-repository.adapter.ts
```

As for the mapping, we could use a dedicated mapper for that:

```
infrastructure/
  adapters/
    dtos/
      create-ticket-request.dto.ts
      ticket-response-dto.ts
    mappers/
      http-ticket.mapper.ts
    http-ticket-repository.adapter.ts
```

And while we're at it, it would be nice for this Adapter and its mapper and DTO to have their own global directory. This could come in handy if one day, we have another adapter:

```
infrastructure/
  adapters/
    http/
      dtos/
        create-ticket-request.dto.ts
        ticket-response-dto.ts
      mappers/
        http-ticket.mapper.ts
      http-ticket-repository.adapter.ts
```

Here, we have a proper structure. We can now implement the DTO and the mapper:

```ts
// create-ticket-request.dto.ts
export type CreateTicketRequestDto = {
  email: string;
  subject: string;
  description: string;
  status: string;
};

// ticket-response-dto.ts
export type TicketResponseDto = {
  id: string;
  trackingId: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  email: string;
  createdAt: string;
  updatedAt?: string;
};
```
and the mapper

```ts
import { NewTicket, Ticket } from "../../../../domain/entities/Ticket";
import { Email } from "../../../../domain/value-objects/Email";
import { CreateTicketRequestDto } from "../dtos/create-ticket-request.dto";
import { TicketResponseDto } from "../dtos/ticket-response.dto";

export function toCreateTicketRequestDto(ticket: NewTicket): CreateTicketRequestDto {
  return {
    email: ticket.email.getValue(),
    subject: ticket.title,
    description: ticket.description,
  };
}

export function toDomainTicket(dto: TicketResponseDto): Ticket {
  return {
    id: dto.id,
    trackingId: dto.trackingId,
    title: dto.title,
    description: dto.description,
    status: dto.status,
    email: Email.create(dto.email),
    createdAt: new Date(dto.createdAt),
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined,
  };
}
```

And, in our Adapter:

```ts
import { inject, Injectable } from "@angular/core";
import { TicketRepositoryPort } from "../../../application/ports/TicketRepositoryPort";
import { NewTicket, Ticket } from "../../../domain/entities/Ticket";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { toCreateTicketRequestDto, toDomainTicket } from "./mappers/http-ticket.mapper";
import { TicketResponseDto } from "./dtos/ticket-response.dto";

@Injectable()
export class HttpTicketRepositoryAdapter implements TicketRepositoryPort {
    private readonly httpClient: HttpClient = inject(HttpClient);
    async create(ticket: NewTicket): Promise<Ticket> {
        const payload = toCreateTicketRequestDto(ticket);
        const result = await firstValueFrom(this.httpClient.post<TicketResponseDto>("/api/tickets", payload));
        return toDomainTicket(result);
    }
}
```

Creating a DTO + mapper achieves:
- The HTTP contract is explicit and versionable.
- You control what crosses the boundary (no accidental fields/methods).
- Domain refactors don’t silently break the API contract.
- Transport concerns (date formatting, naming, optional fields) stay in infrastructure.

So the pattern is:
Port takes Ticket (core language)
Adapter maps Ticket => CreateTicketRequestDto (boundary adaptation)
Adapter posts the DTO (transport contract).

And that's pretty much it.

Now that we have implemented our application layer, let's do the UI.

## UI => Angular Components (Input Adapter)

The **UI layer** is another adapter.

It contains:

* Angular components
* Forms
* Presentation logic

Responsibilities:

* Collect user input
* Invoke use cases
* Render responses
* Manage view state

It must not contain business rules. It delegates decision-making to the application layer.

The component we are about to code will be fairly simple: just a form with a submit button to send the ticket. No special design, we will keep it simple and stupid.
With angular CLI, start by generating a new component into a new directory `src/app/ui/tickets`

```shell
ng g c /ui/tickets/create-ticket
```

In this component, we are going to use the use case `CreateTicketUseCase` we created earlier, as well as the Port. The problem is: this use case is a Plain-Old TypeScript Object, or "POTO", which is a totally made up acronym but I like it so I'm going to keep it. Since it is a POTO, we cannot just inject it like any Angular service. In order to do so, we need an injection token for the Port and the Use Case so Angular knows what dependencies to inject and where to inject them.

Create a new directory called `src/app/di` and inside of it, create a `tickets-providers.ts` file:

```ts
import { InjectionToken, Provider } from "@angular/core";
import { TicketRepositoryPort } from "../application/ports/TicketRepositoryPort";
import { CreateTicketUseCase } from "../application/use-cases/CreateTicketUseCase";
import { HttpTicketRepositoryAdapter } from "../infrastructure/adapters/http/HttpTicketRepositoryAdapter";

export const TICKET_REPOSITORY = new InjectionToken<TicketRepositoryPort>("TICKET_REPOSITORY");

export const TICKETS_PROVIDERS: Provider[] = [
  // adapter (Angular service)
  HttpTicketRepositoryAdapter,

  // port -> adapter binding
  { provide: TICKET_REPOSITORY, useExisting: HttpTicketRepositoryAdapter },

  // use case (constructed with the port)
  {
    provide: CreateTicketUseCase,
    deps: [TICKET_REPOSITORY],
    useFactory: (repo: TicketRepositoryPort) => new CreateTicketUseCase(repo),
  },
];
```
Then, in `app.config.ts`, register those providers:

```ts
import { ApplicationConfig } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { TICKETS_PROVIDERS } from "./app/di/tickets.providers";

export const appConfig: ApplicationConfig = {
  providers: [
    // other providers ...
    provideHttpClient(), ...TICKETS_PROVIDERS],
};

```

By doing so, we basically tell Angular how to inject our POTOs in our components. And now, we can implement our Angular component and inject our Use Case in it. Here is a first implementation. It does not matter if it is not perfect: the idea of this article is for you to better understand hexagonal architecture's principles, rather than Angular best practices. In an ideal world, we would have a dedicated file for those validators, and maybe we could use Signals for the form as well. For now, I'll stick to the good old Reactive Form. I will as well provide custom validators.

```ts
import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateTicketUseCase } from '../../../application/use-cases/CreateTicketUseCase';
import { trimmedMaxLength, trimmedMinLength, trimmedRequired, trimmedEmail } from '../../validators/trimmed.validators';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-ticket.html',
  styleUrl: './create-ticket.scss',
})
export class CreateTicket implements OnInit {
  private readonly createTicketUseCase = inject(CreateTicketUseCase);
  private readonly fb = inject(FormBuilder);

  readonly isSubmitting = signal(false);
  readonly submitError = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    title: ['', [trimmedRequired(), trimmedMaxLength(120)]],
    description: ['', [trimmedRequired(), trimmedMinLength(20), trimmedMaxLength(5000)]],
    email: ['', [trimmedRequired(), trimmedEmail()]],
  });

  readonly titleError = computed(() => {
    const c = this.form.controls.title;
    if (!c.touched) return null;
    if (c.errors?.['required']) return 'Title is required.';
    if (c.errors?.['maxlength']) return 'Title must be ≤ 120 characters.';
    return null;
  });

  readonly descriptionError = computed(() => {
    const c = this.form.controls.description;
    if (!c.touched) return null;
    if (c.errors?.['required']) return 'Description is required.';
    if (c.errors?.['minlength']) return 'Description must be at least 20 characters.';
    if (c.errors?.['maxlength']) return 'Description must be ≤ 5000 characters.';
    return null;
  });

  readonly emailError = computed(() => {
    const c = this.form.controls.email;
    if (!c.touched) return null;
    if (c.errors?.['required']) return 'Email is required.';
    if (c.errors?.['email']) return 'Invalid email format.';
    return null;
  });

  readonly canSubmit = signal(false);

  ngOnInit(): void {
    this.form.statusChanges.subscribe(() => {
      this.canSubmit.set(this.form.valid && !this.isSubmitting());
    });
  }
  
  async submit(): Promise<void> {
    if (this.isSubmitting() || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);

    const { title, description, email } = this.form.getRawValue();

    try {
      await this.createTicketUseCase.execute({
        title: title.trim(),
        description: description.trim(),
        email: email.trim(),
      });

      this.form.reset();
    } catch (e) {
      this.submitError.set(e instanceof Error ? e.message : 'Unable to create ticket.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}

```

And in the template:

```html
<!-- create-ticket.html -->
<form [formGroup]="form" (ngSubmit)="submit()" novalidate class="create-ticket-form">
  <h2>Create Support Ticket</h2>

  <div class="form-group">
    <label for="title">Title</label>
    <input id="title" type="text" formControlName="title" placeholder="Short summary of your issue" />
    @if (titleError(); as err) {
      <small class="error">{{ err }}</small>
    }
  </div>

  <div class="form-group">
    <label for="description">Description</label>
    <textarea
      id="description"
      rows="6"
      formControlName="description"
      placeholder="Describe your issue (minimum 20 characters)"
    ></textarea>
    @if (descriptionError(); as err) {
      <small class="error">{{ err }}</small>
    }
  </div>

  <div class="form-group">
    <label for="email">Email</label>
    <input id="email" type="email" autocomplete="email" formControlName="email" placeholder="you@example.com" />
    @if (emailError(); as err) {
      <small class="error">{{ err }}</small>
    }
  </div>

  @if (submitError(); as err) {
    <div class="error">{{ err }}</div>
  }

  <button type="submit" [disabled]="!canSubmit()">
    @if (isSubmitting()) { Creating… } @else { Create Ticket }
  </button>
</form>

```

For the custom validators, create a directory under `src/app/ui/validators` and add `trimmed.validators.ts`:

```ts
import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export function trimmedRequired(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const value = control.value ?? '';
    return value.trim().length === 0 ? { required: true } : null;
  };
}

export function trimmedMinLength(min: number): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const value = control.value ?? '';
    return value.trim().length < min
      ? { minlength: { requiredLength: min, actualLength: value.trim().length } }
      : null;
  };
}

export function trimmedMaxLength(max: number): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const value = control.value ?? '';
    return value.trim().length > max
      ? { maxlength: { requiredLength: max, actualLength: value.trim().length } }
      : null;
  };
}

export const trimmedEmail = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const v = (control.value ?? '').toString().trim();
    if (!v) return null;
    return Validators.email({ value: v } as any);
  };
};
```

And now, it is time to test! Before launching our server, make sure you:

- remove everything in `app.html` except `<router-outlet/>`
- have the following routes in `app.routes.ts`:

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tickets/create',
        pathMatch: 'full',
    },
    {
        path: 'tickets/create',
        loadComponent: () => import('./ui/tickets/create-ticket/create-ticket').then(m => m.CreateTicket),
    }
];

```

Launch the server:
```shell
ng serve
```

Go to `http://localhost:4200` and try to submit a ticket. It should fail, but only because we do not have any backend implemented. The error should be a `404 error` on `/api/tickets`. So far, it does not matter, as it is out of the scope of this article.

## Testing the architecture

A high-quality app cannot exist without any tests. And hexagonal architecture allows us to better test our app, thanks to concern separation.

### Core Testing
We need, of course, to test our core (Ports + UseCase). This part does not necessitate Angular. The goal is to manage to test everything without any TestBed nor httpClient.

The methodology is pretty simple:
- create fake ports
- inject those fakes in use cases
- test behaviour

In order to test, we are going to use Vitest and do some configuration.

#### Installing and configuring Vitest

Install Vitest:
```shell
npm install -D vitest @vitest/ui jsdom @types/node && npm install -D vite-tsconfig-paths
```
and in your `tsconfig.spec.json`, make sure you have the following section:

```json
"compilerOptions": {
  "outDir": "./out-tsc/spec",
  "types": [
    "vitest/globals",
    "node"
  ]
},
"include": [
  "src/**/*.d.ts",
  "src/**/*.spec.ts",
  "src/**/*.test.ts"
]
```

You can also remove the `app.spec.ts` file: we won't need it anymore.

#### Implementing our fakes
In order to ensure our app will behave the same, no matter the implementations of the Adapters, we need to have a `FakeAdapter` for each Adapter we implement. Create a `src/app/testing/fakes` directory in which you will put all of your fakes.

#### Testing the `HttpTicketRepositoryAdapter`
This Adapters depends on `httpClient`, so it is completely OK to have our test tied to Angular.

Create the `src/app/infrastructure/adapters/http/__tests__` directory and add the `HttpTicketRepositoryAdapter.spec.ts` file:

```ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTicketRepositoryAdapter } from '../HttpTicketRepositoryAdapter';
import { NewTicket } from '../../../../domain/entities/Ticket';
import { Email } from '../../../../domain/value-objects/Email';
import { TicketResponseDto } from '../dtos/ticket-response.dto';

describe('HttpTicketRepositoryAdapter', () => {
  let adapter: HttpTicketRepositoryAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        HttpTicketRepositoryAdapter,
      ],
    });

    adapter = TestBed.inject(HttpTicketRepositoryAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should POST mapped DTO and return mapped domain Ticket', async () => {
    const newTicket: NewTicket = {
      title: 'Payment issue',
      description: 'This description is definitely long enough.',
      email: Email.create('User@Example.com'),
    };

    const promise = adapter.create(newTicket);

    const req = httpMock.expectOne('/api/tickets');
    expect(req.request.method).toBe('POST');

    expect(req.request.body).toEqual({
      email: 'user@example.com',
      subject: 'Payment issue',
      description: 'This description is definitely long enough.',
    });

    const response: TicketResponseDto = {
      id: 'T-99',
      trackingId: 'TRK-99',
      title: 'Payment issue',
      description: 'This description is definitely long enough.',
      status: 'open',
      email: 'user@example.com',
      createdAt: '2026-02-01T10:00:00.000Z',
      updatedAt: '2026-02-01T10:05:00.000Z',
    };

    req.flush(response);

    const created = await promise;

    expect(created.id).toBe('T-99');
    expect(created.trackingId).toBe('TRK-99');
    expect(created.email.getValue()).toBe('user@example.com');
    expect(created.createdAt.toISOString()).toBe('2026-02-01T10:00:00.000Z');
    expect(created.updatedAt!.toISOString()).toBe('2026-02-01T10:05:00.000Z');
  });

  it('should surface HTTP errors as rejections', async () => {
    const newTicket: NewTicket = {
      title: 'Payment issue',
      description: 'This description is definitely long enough.',
      email: Email.create('user@example.com'),
    };

    const promise = adapter.create(newTicket);

    const req = httpMock.expectOne('/api/tickets');
    req.flush({ message: 'Boom' }, { status: 500, statusText: 'Server Error' });

    await expect(promise).rejects.toThrow();
  });
});
```

#### Testing the `http-ticket.mapper.ts`
The mapper does not depend on Angular. Therefore, we will simply use Vitest and write our test in a framework-agnostic way. Write it in a file called `http-ticket-mapper.test.ts` under the `src/app/infrastructure/adapters/http/mappers/__tests__` directory.

```ts
import { toCreateTicketRequestDto, toDomainTicket } from './ http-ticket.mapper';
import { Email } from '../../../../domain/value-objects/Email';
import type { NewTicket } from '../../../../domain/entities/Ticket';
import type { TicketResponseDto } from '../dtos/ticket-response.dto';

describe('http-ticket.mapper', () => {
  it('toCreateTicketRequestDto should map NewTicket to CreateTicketRequestDto', () => {
    const ticket: NewTicket = {
      title: 'Title',
      description: 'This description is definitely long enough.',
      email: Email.create('Test@Example.com'),
    };

    const dto = toCreateTicketRequestDto(ticket);

    expect(dto).toEqual({
      email: 'test@example.com',
      subject: 'Title',
      description: 'This description is definitely long enough.',
    });
  });

  it('toDomainTicket should map TicketResponseDto to Ticket domain object', () => {
    const dto: TicketResponseDto = {
      id: 'T-42',
      trackingId: 'TRK-42',
      title: 'Hello',
      description: 'This description is definitely long enough.',
      status: 'open',
      email: 'User@Example.com',
      createdAt: '2026-02-01T10:00:00.000Z',
      updatedAt: '2026-02-01T11:00:00.000Z',
    };

    const ticket = toDomainTicket(dto);

    expect(ticket.id).toBe('T-42');
    expect(ticket.trackingId).toBe('TRK-42');
    expect(ticket.status).toBe('open');
    expect(ticket.email.getValue()).toBe('user@example.com');
    expect(ticket.createdAt.toISOString()).toBe('2026-02-01T10:00:00.000Z');
    expect(ticket.updatedAt!.toISOString()).toBe('2026-02-01T11:00:00.000Z');
  });

  it('toDomainTicket should keep updatedAt undefined when not present', () => {
    const dto: TicketResponseDto = {
      id: 'T-1',
      trackingId: 'TRK-1',
      title: 'Hello',
      description: 'This description is definitely long enough.',
      status: 'open',
      email: 'user@example.com',
      createdAt: '2026-02-01T10:00:00.000Z',
    };

    const ticket = toDomainTicket(dto);
    expect(ticket.updatedAt).toBeUndefined();
  });
});
```

#### Testing the `CreateTicketUseCase`
This one is pretty interesting. As you now know, the Use Cases are agnostic to Angular. We do not want any framework interference in it, nor in their tests. Earlier, I said we will need to implement a Fake Adapter. The role of the Fake Adapter is to make sure the Use Case works no matter the technical implementation behind the adapters it uses. We need to make sure the business logic works.

##### Implementing `FakeTicketRepositoryAdapter`
Let's create a `src/app/testing/fakes` directory, under which we create a `FakeTicketRepositoryAdapter.ts` file. This class will implement the `TicketRepositoryPort` interface and is pretty basic:

```ts
import { TicketRepositoryPort } from "../../application/ports/TicketRepositoryPort";
import { NewTicket, Ticket } from "../../domain/entities/Ticket";

export class FakeTicketRepositoryAdapter implements TicketRepositoryPort {
  private store: Ticket[] = [];
  private idSequence = 1;
  private trackingSequence = 1;

  constructor(private readonly fixedNow = new Date('2026-01-01T00:00:00.000Z')) {}

  async create(ticket: NewTicket): Promise<Ticket> {
    const created: Ticket = {
      id: `T-${this.idSequence++}`,
      trackingId: `TRACK-${this.trackingSequence++}`,
      title: ticket.title,
      description: ticket.description,
      email: ticket.email,
      status: 'open',
      createdAt: this.fixedNow,
      updatedAt: this.fixedNow,
    };

    this.store.push(created);
    return created;
  }

  getAll(): Ticket[] {
    return [...this.store];
  }

  clear(): void {
    this.store = [];
    this.idSequence = 1;
    this.trackingSequence = 1;
  }
}
```

Now, we need to use this Fake Adapter in our future test.

##### Implementing our test

The test is pretty basic as well. You can write in in `src/app/application/use-cases/__tests__/CreateTicketUseCase.test.ts`:

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { CreateTicketUseCase } from '../CreateTicketUseCase';
import { FakeTicketRepositoryAdapter } from '../../../testing/fakes/FakeTicketRepositoryAdapter';

describe('CreateTicketUseCase', () => {
  let repo: FakeTicketRepositoryAdapter;
  let useCase: CreateTicketUseCase;

  beforeEach(() => {
    repo = new FakeTicketRepositoryAdapter(); // we use our fake repository
    repo.clear();
    useCase = new CreateTicketUseCase(repo);
  });

  it('persists a trimmed + normalized NewTicket via the repository', async () => {
    const created = await useCase.execute({
      title: '  Payment issue  ',
      description: '  This description is definitely long enough.  ',
      email: 'TEST@EXAMPLE.COM',
    });

    // assertions about behavior controlled by the use case
    const stored = repo.getAll();
    expect(stored).toHaveLength(1);

    expect(stored[0].title).toBe('Payment issue');
    expect(stored[0].description).toBe('This description is definitely long enough.');
    expect(stored[0].email.getValue()).toBe('test@example.com');

    // result is whatever the repository returns (don't assert repo internals)
    expect(created.title).toBe('Payment issue');
    expect(created.description).toBe('This description is definitely long enough.');
    expect(created.email.getValue()).toBe('test@example.com');
  });

  it('does not persist when title is empty after trim', async () => {
    await expect(
      useCase.execute({
        title: '   ',
        description: 'This description is definitely long enough.',
        email: 'a@b.com',
      })
    ).rejects.toThrow(/title/i);

    expect(repo.getAll()).toHaveLength(0);
  });

  it('does not persist when description is too short after trim', async () => {
    await expect(
      useCase.execute({
        title: 'Bug',
        description: '                    short                    ',
        email: 'a@b.com',
      })
    ).rejects.toThrow(/20/i);

    expect(repo.getAll()).toHaveLength(0);
  });

  it('does not persist when email is invalid', async () => {
    await expect(
      useCase.execute({
        title: 'Bug',
        description: 'This description is definitely long enough.',
        email: 'not-an-email',
      })
    ).rejects.toThrow(/email/i);

    expect(repo.getAll()).toHaveLength(0);
  });
});

```

You can now launch your tests with:

```shell
npm run test
```

You might notice the `create-ticket.spec.ts` are failing

### Testing the UI
The last thing we need to test now is our `CreateTicket` component. Now, we already have a base with `create-ticket.spec.ts`. But this base does not provide the proper dependencies, so we need to specify them (explanations in comments):

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTicket } from './create-ticket';
import { CreateTicketUseCase } from '../../../application/use-cases/CreateTicketUseCase';
import type { TicketRepositoryPort } from '../../../application/ports/TicketRepositoryPort';
import { FakeTicketRepositoryAdapter } from '../../../testing/fakes/FakeTicketRepositoryAdapter';
import { TICKET_REPOSITORY } from '../../../di/tickets-providers';

function setFormValues(
  component: CreateTicket,
  overrides?: Partial<{ title: string; description: string; email: string }>
) {
  component.form.setValue({
    title: overrides?.title ?? 'Payment issue',
    description: overrides?.description ?? 'This description is definitely long enough.',
    email: overrides?.email ?? 'user@example.com',
  });
}

function getFieldErrorText(fixture: ComponentFixture<CreateTicket>, fieldId: 'title' | 'description' | 'email') {
  const root: HTMLElement = fixture.nativeElement;
  const container = root.querySelector(`#${fieldId}`)?.closest('.form-group');
  if (!container) return null;
  const el = container.querySelector('small.error');
  return el?.textContent?.trim() ?? null;
}

function getGlobalErrorTexts(fixture: ComponentFixture<CreateTicket>) {
  const root: HTMLElement = fixture.nativeElement;
  const errors = Array.from(root.querySelectorAll('div.error')).map((e) => e.textContent?.trim() ?? '');
  // field errors are <small.error>, global errors are <div.error>
  return errors.filter(Boolean);
}

describe('CreateTicket (template + component)', () => {
  let fixture: ComponentFixture<CreateTicket>;
  let component: CreateTicket;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTicket],
      providers: [
        // Here, I use the FakeTicketRepositoryAdapter as I did for the Use Case tests
        FakeTicketRepositoryAdapter,
        // I also provide the class for injecting the port, as it is needed by the Use Case
        { provide: TICKET_REPOSITORY, useExisting: FakeTicketRepositoryAdapter },
        // And I provide the Use Case by using a factory function and specifying the injection token
        // used by this function
        {
          provide: CreateTicketUseCase,
          useFactory: (repo: TicketRepositoryPort) => new CreateTicketUseCase(repo),
          deps: [TICKET_REPOSITORY],
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  // The rest is basic testing
  it('renders the form skeleton', () => {
    const root: HTMLElement = fixture.nativeElement;

    expect(root.querySelector('form.create-ticket-form')).not.toBeNull();
    expect(root.querySelector('h2')?.textContent ?? '').toContain('Create Support Ticket');

    expect(root.querySelector('#title')).not.toBeNull();
    expect(root.querySelector('#description')).not.toBeNull();
    expect(root.querySelector('#email')).not.toBeNull();

    const button = root.querySelector('button[type="submit"]') as HTMLButtonElement | null;
    expect(button).not.toBeNull();
  });

  it('does not render field errors until touched', () => {
    component.form.controls.title.setValue('');
    component.form.controls.description.setValue('');
    component.form.controls.email.setValue('');
    fixture.detectChanges();

    expect(getFieldErrorText(fixture, 'title')).toBeNull();
    expect(getFieldErrorText(fixture, 'description')).toBeNull();
    expect(getFieldErrorText(fixture, 'email')).toBeNull();
  });

  it('disables submit button when form invalid', () => {
    const root: HTMLElement = fixture.nativeElement;
    const button = root.querySelector('button[type="submit"]') as HTMLButtonElement;

    expect(button.disabled).toBe(true);
  });

  it('enables submit button when form becomes valid', async () => {
    setFormValues(component);
    component.form.markAllAsTouched();

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const root: HTMLElement = fixture.nativeElement;
    const button = root.querySelector('button[type="submit"]') as HTMLButtonElement;

    expect(component.form.valid).toBe(true);
    expect(button.disabled).toBe(false);
  });

  it('submits, calls use case with trimmed values, resets the form, and keeps no global error', async () => {
    const uc = TestBed.inject(CreateTicketUseCase);
    const executeSpy = vi.spyOn(uc, 'execute');

    setFormValues(component, {
      title: '  Payment issue  ',
      description: '  This description is definitely long enough.  ',
      email: '  USER@EXAMPLE.COM  ',
    });
    component.form.markAllAsTouched();
    fixture.detectChanges();
    await fixture.whenStable();
    await component.submit();
    fixture.detectChanges();

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy.mock.calls[0][0]).toEqual({
      title: 'Payment issue',
      description: 'This description is definitely long enough.',
      email: 'USER@EXAMPLE.COM',
    });


    expect(component.form.controls.title.value).toBe('');
    expect(component.form.controls.description.value).toBe('');
    expect(component.form.controls.email.value).toBe('');

    expect(getGlobalErrorTexts(fixture)).toEqual([]);
  });

  it('renders global submit error when use case throws', async () => {
    const uc = TestBed.inject(CreateTicketUseCase);
    vi.spyOn(uc, 'execute').mockRejectedValue(new Error('Boom'));

    setFormValues(component);
    component.form.markAllAsTouched();
    fixture.detectChanges();
    await fixture.whenStable();

    await component.submit();
    fixture.detectChanges();

    expect(component.submitError()).toBe('Boom');

    const globalErrors = getGlobalErrorTexts(fixture);
    expect(globalErrors).toContain('Boom');
  });
});

```

And this is it!
Through this simple example, we just saw the basics of hexagonal architecture in Angular!

Below is the continuation you can append to your article after section 10.
It is consistent with the tone and structure of your current draft .

## What We Gained

At this point, the architecture is no longer theoretical. We have a working Angular feature built around a strict separation of concerns.

Let’s examine what this structure actually gives us in practice.

### Clear Separation of Concerns

Each layer has a single responsibility:

* **Domain** expresses business rules.
* **Application** orchestrates use cases.
* **Infrastructure** handles technical integration.
* **UI** collects input and renders output.

No layer bleeds into another. If a business rule changes, it lives in the domain or use case. If the API changes, only the HTTP adapter is affected.

This reduces cognitive load. When reading a file, you know what type of logic belongs there.

### Framework Independence

The core of the application:

* Does not import Angular.
* Does not depend on RxJS.
* Does not rely on HttpClient.
* Does not depend on browser APIs.

This means:

* It can be tested with plain TypeScript.
* It could be reused in another frontend framework.
* It could even be reused in a Node.js backend.

Angular becomes a detail, not the foundation.

### Replaceable Infrastructure

If tomorrow:

* You switch from REST to GraphQL.
* You add offline support.
* You cache tickets in IndexedDB.
* You migrate to a different backend contract.

You only touch the adapter layer.

The domain and use cases remain untouched.

This drastically reduces change cost.

### High Testability

We achieved three levels of testing:

1. **Core tests (no Angular, no TestBed)**

   * Pure TypeScript.
   * Fake adapters.
   * Fast execution.

2. **Infrastructure tests**

   * Angular TestBed.
   * HttpTestingController.
   * Contract validation.

3. **UI tests**

   * Component rendering.
   * Form behavior.
   * Use case wiring.

The architecture enforces this testability.

If you need Angular to test business rules, the architecture is already broken.

### Scalability for Teams

In a growing team:

* Domain experts can focus on business rules.
* Frontend engineers can work on UI.
* Backend/API contracts are isolated in adapters.
* Refactors become localized.

Boundaries reduce friction between contributors.

Hexagonal architecture is not about patterns.
It is about coordination under complexity.

## Common Mistakes in Angular Hexagonal Implementations

Hexagonal architecture is simple in principle. It becomes distorted when misunderstood.

Here are common mistakes.

### Putting Business Logic in Angular Services

Angular services are often mistaken for "the domain."

They are not.

A service that:

* Calls HttpClient
* Applies validation
* Makes business decisions
* Mutates state

is mixing layers.

Business rules must live in the domain or use case.
Services are infrastructure or orchestration tools, not the core model.

### Letting Adapters Leak into the Domain

If you see:

* DTO types imported in domain entities
* HttpClient referenced inside a use case
* Observable exposed in ports

you have violated the boundary.

Ports must stay framework-neutral.
Adapters translate between core language and transport language.

The domain should not know what JSON looks like.

### Injecting HttpClient Directly into Components

This is the most common Angular anti-pattern.

When a component directly calls HttpClient:

* UI layer collapses into infrastructure.
* Business rules end up in submit() handlers.
* Tests become heavy.

The component should call a use case.
Nothing else.

### Overengineering Too Early

Hexagonal architecture is about structure, not abstraction for its own sake.

Do not:

* Create dozens of ports for trivial features.
* Introduce artificial layers for simple apps.
* Add complexity without business justification.

Start simple:

* One repository port.
* One use case.
* One adapter.

Split only when the system demands it.

## When to Use (and When Not To)

Hexagonal architecture is powerful, but not universal.

### Use It When

* Your Angular app has real business logic.
* Validation rules evolve over time.
* Multiple data sources may appear.
* You expect long-term maintenance.
* Multiple developers collaborate.

It shines when complexity grows.

### Avoid It When

* The project is a temporary prototype.
* The app is a pure CRUD demo.
* The domain logic is trivial.
* The codebase will be discarded shortly.

Architecture has a cost.

Apply it where complexity justifies it.

## Conclusion

Angular is not your architecture.

It is a UI framework.

If Angular disappears tomorrow, your business logic should survive.

Hexagonal architecture enforces that survival.

It keeps:

* The domain stable.
* The application layer explicit.
* Infrastructure replaceable.
* The UI thin.

What we built in this article is minimal.
But the structure scales.

When complexity grows, boundaries protect you.

That is the real value of hexagonal architecture.
