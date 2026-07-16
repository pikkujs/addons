// Data sources — Data source endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

const propertyOrTimestampFilterSchema = z.union([z.union([z.object({
  title: z.union([z.union([z.object({
    equals: z.string(),
  }), z.object({
    does_not_equal: z.string(),
  }), z.object({
    contains: z.string(),
  }), z.object({
    does_not_contain: z.string(),
  }), z.object({
    starts_with: z.string(),
  }), z.object({
    ends_with: z.string(),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  rich_text: z.union([z.union([z.object({
    equals: z.string(),
  }), z.object({
    does_not_equal: z.string(),
  }), z.object({
    contains: z.string(),
  }), z.object({
    does_not_contain: z.string(),
  }), z.object({
    starts_with: z.string(),
  }), z.object({
    ends_with: z.string(),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  number: z.union([z.union([z.object({
    equals: z.number(),
  }), z.object({
    does_not_equal: z.number(),
  }), z.object({
    greater_than: z.number(),
  }), z.object({
    less_than: z.number(),
  }), z.object({
    greater_than_or_equal_to: z.number(),
  }), z.object({
    less_than_or_equal_to: z.number(),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  checkbox: z.union([z.object({
    equals: z.boolean(),
  }), z.object({
    does_not_equal: z.boolean(),
  })]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  select: z.union([z.union([z.object({
    equals: z.union([z.string(), z.array(z.string())]),
  }), z.object({
    does_not_equal: z.union([z.string(), z.array(z.string())]),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  multi_select: z.union([z.union([z.object({
    contains: z.union([z.string(), z.array(z.string())]),
  }), z.object({
    does_not_contain: z.union([z.string(), z.array(z.string())]),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  status: z.union([z.union([z.object({
    equals: z.union([z.string(), z.array(z.string())]),
  }), z.object({
    does_not_equal: z.union([z.string(), z.array(z.string())]),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  date: z.union([z.union([z.object({
    equals: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    on_or_before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    on_or_after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    this_week: z.record(z.string(), z.unknown()),
  }), z.object({
    past_week: z.record(z.string(), z.unknown()),
  }), z.object({
    past_month: z.record(z.string(), z.unknown()),
  }), z.object({
    past_year: z.record(z.string(), z.unknown()),
  }), z.object({
    next_week: z.record(z.string(), z.unknown()),
  }), z.object({
    next_month: z.record(z.string(), z.unknown()),
  }), z.object({
    next_year: z.record(z.string(), z.unknown()),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  people: z.union([z.union([z.object({
    contains: z.union([z.string(), z.string()]),
  }), z.object({
    does_not_contain: z.union([z.string(), z.string()]),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  files: z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  url: z.union([z.union([z.object({
    equals: z.string(),
  }), z.object({
    does_not_equal: z.string(),
  }), z.object({
    contains: z.string(),
  }), z.object({
    does_not_contain: z.string(),
  }), z.object({
    starts_with: z.string(),
  }), z.object({
    ends_with: z.string(),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  email: z.union([z.union([z.object({
    equals: z.string(),
  }), z.object({
    does_not_equal: z.string(),
  }), z.object({
    contains: z.string(),
  }), z.object({
    does_not_contain: z.string(),
  }), z.object({
    starts_with: z.string(),
  }), z.object({
    ends_with: z.string(),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  phone_number: z.union([z.union([z.object({
    equals: z.string(),
  }), z.object({
    does_not_equal: z.string(),
  }), z.object({
    contains: z.string(),
  }), z.object({
    does_not_contain: z.string(),
  }), z.object({
    starts_with: z.string(),
  }), z.object({
    ends_with: z.string(),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  relation: z.union([z.union([z.object({
    contains: z.string(),
  }), z.object({
    does_not_contain: z.string(),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  created_by: z.union([z.union([z.object({
    contains: z.union([z.string(), z.string()]),
  }), z.object({
    does_not_contain: z.union([z.string(), z.string()]),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  created_time: z.union([z.union([z.object({
    equals: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    on_or_before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    on_or_after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    this_week: z.record(z.string(), z.unknown()),
  }), z.object({
    past_week: z.record(z.string(), z.unknown()),
  }), z.object({
    past_month: z.record(z.string(), z.unknown()),
  }), z.object({
    past_year: z.record(z.string(), z.unknown()),
  }), z.object({
    next_week: z.record(z.string(), z.unknown()),
  }), z.object({
    next_month: z.record(z.string(), z.unknown()),
  }), z.object({
    next_year: z.record(z.string(), z.unknown()),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  last_edited_by: z.union([z.union([z.object({
    contains: z.union([z.string(), z.string()]),
  }), z.object({
    does_not_contain: z.union([z.string(), z.string()]),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  last_edited_time: z.union([z.union([z.object({
    equals: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    on_or_before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    on_or_after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    this_week: z.record(z.string(), z.unknown()),
  }), z.object({
    past_week: z.record(z.string(), z.unknown()),
  }), z.object({
    past_month: z.record(z.string(), z.unknown()),
  }), z.object({
    past_year: z.record(z.string(), z.unknown()),
  }), z.object({
    next_week: z.record(z.string(), z.unknown()),
  }), z.object({
    next_month: z.record(z.string(), z.unknown()),
  }), z.object({
    next_year: z.record(z.string(), z.unknown()),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  formula: z.union([z.object({
    string: z.union([z.union([z.object({
      equals: z.string(),
    }), z.object({
      does_not_equal: z.string(),
    }), z.object({
      contains: z.string(),
    }), z.object({
      does_not_contain: z.string(),
    }), z.object({
      starts_with: z.string(),
    }), z.object({
      ends_with: z.string(),
    })]), z.union([z.object({
      is_empty: z.boolean(),
    }), z.object({
      is_not_empty: z.boolean(),
    })])]),
  }), z.object({
    checkbox: z.union([z.object({
      equals: z.boolean(),
    }), z.object({
      does_not_equal: z.boolean(),
    })]),
  }), z.object({
    number: z.union([z.union([z.object({
      equals: z.number(),
    }), z.object({
      does_not_equal: z.number(),
    }), z.object({
      greater_than: z.number(),
    }), z.object({
      less_than: z.number(),
    }), z.object({
      greater_than_or_equal_to: z.number(),
    }), z.object({
      less_than_or_equal_to: z.number(),
    })]), z.union([z.object({
      is_empty: z.boolean(),
    }), z.object({
      is_not_empty: z.boolean(),
    })])]),
  }), z.object({
    date: z.union([z.union([z.object({
      equals: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
    }), z.object({
      before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
    }), z.object({
      after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
    }), z.object({
      on_or_before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
    }), z.object({
      on_or_after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
    }), z.object({
      this_week: z.record(z.string(), z.unknown()),
    }), z.object({
      past_week: z.record(z.string(), z.unknown()),
    }), z.object({
      past_month: z.record(z.string(), z.unknown()),
    }), z.object({
      past_year: z.record(z.string(), z.unknown()),
    }), z.object({
      next_week: z.record(z.string(), z.unknown()),
    }), z.object({
      next_month: z.record(z.string(), z.unknown()),
    }), z.object({
      next_year: z.record(z.string(), z.unknown()),
    })]), z.union([z.object({
      is_empty: z.boolean(),
    }), z.object({
      is_not_empty: z.boolean(),
    })])]),
  })]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  unique_id: z.union([z.union([z.object({
    equals: z.number(),
  }), z.object({
    does_not_equal: z.number(),
  }), z.object({
    greater_than: z.number(),
  }), z.object({
    less_than: z.number(),
  }), z.object({
    greater_than_or_equal_to: z.number(),
  }), z.object({
    less_than_or_equal_to: z.number(),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  rollup: z.union([z.object({
    any: z.union([z.object({
      rich_text: z.union([z.union([z.object({
        equals: z.string(),
      }), z.object({
        does_not_equal: z.string(),
      }), z.object({
        contains: z.string(),
      }), z.object({
        does_not_contain: z.string(),
      }), z.object({
        starts_with: z.string(),
      }), z.object({
        ends_with: z.string(),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      number: z.union([z.union([z.object({
        equals: z.number(),
      }), z.object({
        does_not_equal: z.number(),
      }), z.object({
        greater_than: z.number(),
      }), z.object({
        less_than: z.number(),
      }), z.object({
        greater_than_or_equal_to: z.number(),
      }), z.object({
        less_than_or_equal_to: z.number(),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      checkbox: z.union([z.object({
        equals: z.boolean(),
      }), z.object({
        does_not_equal: z.boolean(),
      })]),
    }), z.object({
      select: z.union([z.union([z.object({
        equals: z.union([z.string(), z.array(z.string())]),
      }), z.object({
        does_not_equal: z.union([z.string(), z.array(z.string())]),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      multi_select: z.union([z.union([z.object({
        contains: z.union([z.string(), z.array(z.string())]),
      }), z.object({
        does_not_contain: z.union([z.string(), z.array(z.string())]),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      relation: z.union([z.union([z.object({
        contains: z.string(),
      }), z.object({
        does_not_contain: z.string(),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      date: z.union([z.union([z.object({
        equals: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
      }), z.object({
        before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
      }), z.object({
        after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
      }), z.object({
        on_or_before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
      }), z.object({
        on_or_after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
      }), z.object({
        this_week: z.record(z.string(), z.unknown()),
      }), z.object({
        past_week: z.record(z.string(), z.unknown()),
      }), z.object({
        past_month: z.record(z.string(), z.unknown()),
      }), z.object({
        past_year: z.record(z.string(), z.unknown()),
      }), z.object({
        next_week: z.record(z.string(), z.unknown()),
      }), z.object({
        next_month: z.record(z.string(), z.unknown()),
      }), z.object({
        next_year: z.record(z.string(), z.unknown()),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      people: z.union([z.union([z.object({
        contains: z.union([z.string(), z.string()]),
      }), z.object({
        does_not_contain: z.union([z.string(), z.string()]),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      files: z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })]),
    }), z.object({
      status: z.union([z.union([z.object({
        equals: z.union([z.string(), z.array(z.string())]),
      }), z.object({
        does_not_equal: z.union([z.string(), z.array(z.string())]),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    })]),
  }), z.object({
    none: z.union([z.object({
      rich_text: z.union([z.union([z.object({
        equals: z.string(),
      }), z.object({
        does_not_equal: z.string(),
      }), z.object({
        contains: z.string(),
      }), z.object({
        does_not_contain: z.string(),
      }), z.object({
        starts_with: z.string(),
      }), z.object({
        ends_with: z.string(),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      number: z.union([z.union([z.object({
        equals: z.number(),
      }), z.object({
        does_not_equal: z.number(),
      }), z.object({
        greater_than: z.number(),
      }), z.object({
        less_than: z.number(),
      }), z.object({
        greater_than_or_equal_to: z.number(),
      }), z.object({
        less_than_or_equal_to: z.number(),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      checkbox: z.union([z.object({
        equals: z.boolean(),
      }), z.object({
        does_not_equal: z.boolean(),
      })]),
    }), z.object({
      select: z.union([z.union([z.object({
        equals: z.union([z.string(), z.array(z.string())]),
      }), z.object({
        does_not_equal: z.union([z.string(), z.array(z.string())]),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      multi_select: z.union([z.union([z.object({
        contains: z.union([z.string(), z.array(z.string())]),
      }), z.object({
        does_not_contain: z.union([z.string(), z.array(z.string())]),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      relation: z.union([z.union([z.object({
        contains: z.string(),
      }), z.object({
        does_not_contain: z.string(),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      date: z.union([z.union([z.object({
        equals: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
      }), z.object({
        before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
      }), z.object({
        after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
      }), z.object({
        on_or_before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
      }), z.object({
        on_or_after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
      }), z.object({
        this_week: z.record(z.string(), z.unknown()),
      }), z.object({
        past_week: z.record(z.string(), z.unknown()),
      }), z.object({
        past_month: z.record(z.string(), z.unknown()),
      }), z.object({
        past_year: z.record(z.string(), z.unknown()),
      }), z.object({
        next_week: z.record(z.string(), z.unknown()),
      }), z.object({
        next_month: z.record(z.string(), z.unknown()),
      }), z.object({
        next_year: z.record(z.string(), z.unknown()),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      people: z.union([z.union([z.object({
        contains: z.union([z.string(), z.string()]),
      }), z.object({
        does_not_contain: z.union([z.string(), z.string()]),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      files: z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })]),
    }), z.object({
      status: z.union([z.union([z.object({
        equals: z.union([z.string(), z.array(z.string())]),
      }), z.object({
        does_not_equal: z.union([z.string(), z.array(z.string())]),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    })]),
  }), z.object({
    every: z.union([z.object({
      rich_text: z.union([z.union([z.object({
        equals: z.string(),
      }), z.object({
        does_not_equal: z.string(),
      }), z.object({
        contains: z.string(),
      }), z.object({
        does_not_contain: z.string(),
      }), z.object({
        starts_with: z.string(),
      }), z.object({
        ends_with: z.string(),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      number: z.union([z.union([z.object({
        equals: z.number(),
      }), z.object({
        does_not_equal: z.number(),
      }), z.object({
        greater_than: z.number(),
      }), z.object({
        less_than: z.number(),
      }), z.object({
        greater_than_or_equal_to: z.number(),
      }), z.object({
        less_than_or_equal_to: z.number(),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      checkbox: z.union([z.object({
        equals: z.boolean(),
      }), z.object({
        does_not_equal: z.boolean(),
      })]),
    }), z.object({
      select: z.union([z.union([z.object({
        equals: z.union([z.string(), z.array(z.string())]),
      }), z.object({
        does_not_equal: z.union([z.string(), z.array(z.string())]),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      multi_select: z.union([z.union([z.object({
        contains: z.union([z.string(), z.array(z.string())]),
      }), z.object({
        does_not_contain: z.union([z.string(), z.array(z.string())]),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      relation: z.union([z.union([z.object({
        contains: z.string(),
      }), z.object({
        does_not_contain: z.string(),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      date: z.union([z.union([z.object({
        equals: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
      }), z.object({
        before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
      }), z.object({
        after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
      }), z.object({
        on_or_before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
      }), z.object({
        on_or_after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
      }), z.object({
        this_week: z.record(z.string(), z.unknown()),
      }), z.object({
        past_week: z.record(z.string(), z.unknown()),
      }), z.object({
        past_month: z.record(z.string(), z.unknown()),
      }), z.object({
        past_year: z.record(z.string(), z.unknown()),
      }), z.object({
        next_week: z.record(z.string(), z.unknown()),
      }), z.object({
        next_month: z.record(z.string(), z.unknown()),
      }), z.object({
        next_year: z.record(z.string(), z.unknown()),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      people: z.union([z.union([z.object({
        contains: z.union([z.string(), z.string()]),
      }), z.object({
        does_not_contain: z.union([z.string(), z.string()]),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    }), z.object({
      files: z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })]),
    }), z.object({
      status: z.union([z.union([z.object({
        equals: z.union([z.string(), z.array(z.string())]),
      }), z.object({
        does_not_equal: z.union([z.string(), z.array(z.string())]),
      })]), z.union([z.object({
        is_empty: z.boolean(),
      }), z.object({
        is_not_empty: z.boolean(),
      })])]),
    })]),
  }), z.object({
    date: z.union([z.union([z.object({
      equals: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
    }), z.object({
      before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
    }), z.object({
      after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
    }), z.object({
      on_or_before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
    }), z.object({
      on_or_after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
    }), z.object({
      this_week: z.record(z.string(), z.unknown()),
    }), z.object({
      past_week: z.record(z.string(), z.unknown()),
    }), z.object({
      past_month: z.record(z.string(), z.unknown()),
    }), z.object({
      past_year: z.record(z.string(), z.unknown()),
    }), z.object({
      next_week: z.record(z.string(), z.unknown()),
    }), z.object({
      next_month: z.record(z.string(), z.unknown()),
    }), z.object({
      next_year: z.record(z.string(), z.unknown()),
    })]), z.union([z.object({
      is_empty: z.boolean(),
    }), z.object({
      is_not_empty: z.boolean(),
    })])]),
  }), z.object({
    number: z.union([z.union([z.object({
      equals: z.number(),
    }), z.object({
      does_not_equal: z.number(),
    }), z.object({
      greater_than: z.number(),
    }), z.object({
      less_than: z.number(),
    }), z.object({
      greater_than_or_equal_to: z.number(),
    }), z.object({
      less_than_or_equal_to: z.number(),
    })]), z.union([z.object({
      is_empty: z.boolean(),
    }), z.object({
      is_not_empty: z.boolean(),
    })])]),
  })]),
  property: z.string(),
  type: z.string().optional(),
}), z.object({
  verification: z.object({
    status: z.enum(["verified", "expired", "none"]),
  }),
  property: z.string(),
  type: z.string().optional(),
})]), z.union([z.object({
  created_time: z.union([z.union([z.object({
    equals: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    on_or_before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    on_or_after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    this_week: z.record(z.string(), z.unknown()),
  }), z.object({
    past_week: z.record(z.string(), z.unknown()),
  }), z.object({
    past_month: z.record(z.string(), z.unknown()),
  }), z.object({
    past_year: z.record(z.string(), z.unknown()),
  }), z.object({
    next_week: z.record(z.string(), z.unknown()),
  }), z.object({
    next_month: z.record(z.string(), z.unknown()),
  }), z.object({
    next_year: z.record(z.string(), z.unknown()),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  timestamp: z.string(),
  type: z.string().optional(),
}), z.object({
  last_edited_time: z.union([z.union([z.object({
    equals: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    on_or_before: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    on_or_after: z.union([z.string().date(), z.enum(["today", "tomorrow", "yesterday", "one_week_ago", "one_week_from_now", "one_month_ago", "one_month_from_now"])]),
  }), z.object({
    this_week: z.record(z.string(), z.unknown()),
  }), z.object({
    past_week: z.record(z.string(), z.unknown()),
  }), z.object({
    past_month: z.record(z.string(), z.unknown()),
  }), z.object({
    past_year: z.record(z.string(), z.unknown()),
  }), z.object({
    next_week: z.record(z.string(), z.unknown()),
  }), z.object({
    next_month: z.record(z.string(), z.unknown()),
  }), z.object({
    next_year: z.record(z.string(), z.unknown()),
  })]), z.union([z.object({
    is_empty: z.boolean(),
  }), z.object({
    is_not_empty: z.boolean(),
  })])]),
  timestamp: z.string(),
  type: z.string().optional(),
})])])

export const PostDatabaseQueryInput = z.any()

export const PostDatabaseQueryOutput = z.object({
  type: z.string(),
  page_or_data_source: z.record(z.string(), z.unknown()),
  object: z.string(),
  next_cursor: z.unknown(),
  has_more: z.boolean(),
  results: z.array(z.union([z.union([z.object({
    object: z.string().describe("The page object type name."),
    id: z.string().uuid().describe("The ID of the page."),
    created_time: z.string().datetime().describe("Date and time when this page was created."),
    last_edited_time: z.string().datetime().describe("Date and time when this page was last edited."),
    in_trash: z.boolean().describe("Whether the page is in trash."),
    is_archived: z.boolean().describe("Whether the page has been archived."),
    is_locked: z.boolean().describe("Whether the page is locked from editing in the Notion app UI."),
    url: z.string().describe("The URL of the Notion page."),
    public_url: z.union([z.string(), z.unknown()]).describe("The public URL of the Notion page, if it has been published to the web."),
    parent: z.union([z.object({
      type: z.string().describe("The parent type."),
      database_id: z.string().uuid().describe("The ID of the parent database."),
    }), z.object({
      type: z.string().describe("The parent type."),
      data_source_id: z.string().uuid().describe("The ID of the parent data source."),
      database_id: z.string().uuid().describe("The ID of the data source's parent database."),
    }), z.object({
      type: z.string().describe("The parent type."),
      page_id: z.string().uuid().describe("The ID of the parent page."),
    }), z.object({
      type: z.string().describe("The parent type."),
      block_id: z.string().uuid().describe("The ID of the parent block."),
    }), z.object({
      type: z.string().describe("The parent type."),
      agent_id: z.string().uuid().describe("The ID of the parent agent."),
    }), z.object({
      type: z.string().describe("The parent type."),
      workspace: z.boolean().describe("Always true for workspace parent."),
    })]).describe("Information about the page's parent."),
    properties: z.record(z.string(), z.object({
      id: z.string(),
    })).describe("Property values of this page."),
    icon: z.union([z.union([z.object({
      type: z.string().describe("Type of icon. In this case, an emoji."),
      emoji: z.string().describe("The emoji character used as the icon."),
    }), z.object({
      type: z.string().describe("Type of icon. In this case, a file."),
      file: z.object({
        url: z.string().describe("The URL of the file."),
        expiry_time: z.string().datetime().describe("The time when the URL will expire."),
      }).describe("The file URL for the icon."),
    }), z.object({
      type: z.string().describe("Type of icon. In this case, an external URL."),
      external: z.object({
        url: z.string().describe("The URL of the external file or resource."),
      }).describe("The external URL for the icon."),
    }), z.object({
      type: z.string().describe("Type of icon. In this case, a custom emoji."),
      custom_emoji: z.object({
        id: z.string().uuid().describe("The ID of the custom emoji."),
        name: z.string().describe("The name of the custom emoji."),
        url: z.string().describe("The URL of the custom emoji."),
      }).describe("The custom emoji details for the icon."),
    }), z.object({
      type: z.string().describe("Type of icon. In this case, a Notion native icon."),
      icon: z.object({
        name: z.string().describe("The name of the Notion icon (e.g. pizza, meeting, home). See the Notion icon picker for valid names."),
        color: z.enum(["gray", "lightgray", "brown", "yellow", "orange", "green", "blue", "purple", "pink", "red"]).describe("The color variant of the icon. Valid values: gray, lightgray, brown, yellow, orange, green, blue, purple, pink, red."),
      }).describe("The Notion native icon, specified by name and color."),
    })]), z.unknown()]).describe("Page icon."),
    cover: z.union([z.union([z.object({
      type: z.string().describe("Type of cover. In this case, a file."),
      file: z.object({
        url: z.string().describe("The URL of the file."),
        expiry_time: z.string().datetime().describe("The time when the URL will expire."),
      }).describe("The file URL for the cover."),
    }), z.object({
      type: z.string().describe("Type of cover. In this case, an external URL."),
      external: z.object({
        url: z.string().describe("The URL of the external file or resource."),
      }).describe("The external URL for the cover."),
    })]), z.unknown()]).describe("Page cover image."),
    created_by: z.object({
      id: z.string().uuid(),
      object: z.string().describe("Always `user`"),
    }).describe("User who created the page."),
    last_edited_by: z.object({
      id: z.string().uuid(),
      object: z.string().describe("Always `user`"),
    }).describe("User who last edited the page."),
  }), z.object({
    object: z.string().describe("The page object type name."),
    id: z.string().uuid().describe("The ID of the page."),
  })]), z.union([z.object({
    object: z.string().describe("The data source object type name."),
    id: z.string().uuid().describe("The ID of the data source."),
    properties: z.record(z.string(), z.object({
      id: z.string().describe("The ID of the property."),
      name: z.string().describe("The name of the property."),
      description: z.union([z.string(), z.unknown()]).describe("The description of the property."),
    })).describe("The properties schema of the data source."),
  }), z.object({
    object: z.string().describe("The data source object type name."),
    id: z.string().uuid().describe("The ID of the data source."),
    title: z.array(z.object({
      plain_text: z.string().describe("The plain text content of the rich text object, without any styling."),
      href: z.union([z.string(), z.unknown()]).describe("A URL that the rich text object links to or mentions."),
      annotations: z.object({
        bold: z.boolean(),
        italic: z.boolean(),
        strikethrough: z.boolean(),
        underline: z.boolean(),
        code: z.boolean(),
        color: z.enum(["default", "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red", "default_background", "gray_background", "brown_background", "orange_background", "yellow_background", "green_background", "blue_background", "purple_background", "pink_background", "red_background"]).describe("One of: `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red`, `default_background`, `gray_background`, `brown_background`, `orange_background`, `yellow_background`, `green_background`, `blue_background`, `purple_background`, `pink_background`, `red_background`"),
      }).describe("All rich text objects contain an annotations object that sets the styling for the rich text."),
    })).max(100).describe("The title of the data source."),
    description: z.array(z.object({
      plain_text: z.string().describe("The plain text content of the rich text object, without any styling."),
      href: z.union([z.string(), z.unknown()]).describe("A URL that the rich text object links to or mentions."),
      annotations: z.object({
        bold: z.boolean(),
        italic: z.boolean(),
        strikethrough: z.boolean(),
        underline: z.boolean(),
        code: z.boolean(),
        color: z.enum(["default", "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red", "default_background", "gray_background", "brown_background", "orange_background", "yellow_background", "green_background", "blue_background", "purple_background", "pink_background", "red_background"]).describe("One of: `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red`, `default_background`, `gray_background`, `brown_background`, `orange_background`, `yellow_background`, `green_background`, `blue_background`, `purple_background`, `pink_background`, `red_background`"),
      }).describe("All rich text objects contain an annotations object that sets the styling for the rich text."),
    })).max(100).describe("The description of the data source."),
    parent: z.union([z.object({
      type: z.string().describe("The parent type."),
      database_id: z.string().uuid().describe("The ID of the parent database."),
    }), z.object({
      type: z.string().describe("The parent type."),
      data_source_id: z.string().uuid().describe("The ID of the parent data source."),
      database_id: z.string().uuid().describe("The ID of the data source's parent database."),
    })]).describe("The parent of the data source."),
    database_parent: z.union([z.object({
      type: z.string().describe("The parent type."),
      page_id: z.string().uuid().describe("The ID of the parent page."),
    }), z.object({
      type: z.string().describe("The parent type."),
      workspace: z.boolean().describe("Always true for workspace parent."),
    }), z.object({
      type: z.string().describe("The parent type."),
      database_id: z.string().uuid().describe("The ID of the parent database."),
    }), z.object({
      type: z.string().describe("The parent type."),
      block_id: z.string().uuid().describe("The ID of the parent block."),
    })]).describe("The parent of the data source's containing database. This is typically a page, block, or workspace, but can be another database in the case of wikis."),
    is_inline: z.boolean().describe("Whether the data source is inline."),
    in_trash: z.boolean().describe("Whether the data source is in the trash."),
    created_time: z.string().datetime().describe("The time when the data source was created."),
    last_edited_time: z.string().datetime().describe("The time when the data source was last edited."),
    created_by: z.object({
      id: z.string().uuid(),
      object: z.string().describe("Always `user`"),
    }).describe("The user who created the data source."),
    last_edited_by: z.object({
      id: z.string().uuid(),
      object: z.string().describe("Always `user`"),
    }).describe("The user who last edited the data source."),
    properties: z.record(z.string(), z.object({
      id: z.string().describe("The ID of the property."),
      name: z.string().describe("The name of the property."),
      description: z.union([z.string(), z.unknown()]).describe("The description of the property."),
    })).describe("The properties schema of the data source."),
    icon: z.union([z.union([z.object({
      type: z.string().describe("Type of icon. In this case, an emoji."),
      emoji: z.string().describe("The emoji character used as the icon."),
    }), z.object({
      type: z.string().describe("Type of icon. In this case, a file."),
      file: z.object({
        url: z.string().describe("The URL of the file."),
        expiry_time: z.string().datetime().describe("The time when the URL will expire."),
      }).describe("The file URL for the icon."),
    }), z.object({
      type: z.string().describe("Type of icon. In this case, an external URL."),
      external: z.object({
        url: z.string().describe("The URL of the external file or resource."),
      }).describe("The external URL for the icon."),
    }), z.object({
      type: z.string().describe("Type of icon. In this case, a custom emoji."),
      custom_emoji: z.object({
        id: z.string().uuid().describe("The ID of the custom emoji."),
        name: z.string().describe("The name of the custom emoji."),
        url: z.string().describe("The URL of the custom emoji."),
      }).describe("The custom emoji details for the icon."),
    }), z.object({
      type: z.string().describe("Type of icon. In this case, a Notion native icon."),
      icon: z.object({
        name: z.string().describe("The name of the Notion icon (e.g. pizza, meeting, home). See the Notion icon picker for valid names."),
        color: z.enum(["gray", "lightgray", "brown", "yellow", "orange", "green", "blue", "purple", "pink", "red"]).describe("The color variant of the icon. Valid values: gray, lightgray, brown, yellow, orange, green, blue, purple, pink, red."),
      }).describe("The Notion native icon, specified by name and color."),
    })]), z.unknown()]).describe("The icon of the data source."),
    cover: z.union([z.union([z.object({
      type: z.string().describe("Type of cover. In this case, a file."),
      file: z.object({
        url: z.string().describe("The URL of the file."),
        expiry_time: z.string().datetime().describe("The time when the URL will expire."),
      }).describe("The file URL for the cover."),
    }), z.object({
      type: z.string().describe("Type of cover. In this case, an external URL."),
      external: z.object({
        url: z.string().describe("The URL of the external file or resource."),
      }).describe("The external URL for the cover."),
    })]), z.unknown()]).describe("The cover of the data source."),
    url: z.string().describe("The URL of the data source."),
    public_url: z.union([z.string(), z.unknown()]).describe("The public URL of the data source if it is publicly accessible."),
  })])])),
  request_status: z.object({
    type: z.enum(["complete", "incomplete"]),
    incomplete_reason: z.literal("query_result_limit_reached").optional(),
  }).optional(),
})

export const postDatabaseQuery = pikkuSessionlessFunc({
  description: "Query a data source",
  input: PostDatabaseQueryInput,
  output: PostDatabaseQueryOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("POST", "/v1/data_sources/{data_source_id}/query", data) as any
  },
})
