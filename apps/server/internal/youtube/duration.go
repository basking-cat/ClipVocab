package youtube

import (
	"fmt"
	"strings"
)

// ParseISODuration converts a YouTube contentDetails.duration value (ISO 8601, e.g. PT1H2M3S) into seconds.
func ParseISODuration(iso string) (int, error) {
	if !strings.HasPrefix(iso, "PT") || len(iso) == 2 {
		return 0, fmt.Errorf("invalid duration %q", iso)
	}

	rest := iso[2:]
	var hours, mins, secs, n int
	var sawUnit bool
	for i := 0; i < len(rest); i++ {
		c := rest[i]
		if c >= '0' && c <= '9' {
			n = n*10 + int(c-'0')
			continue
		}
		if c == '.' {
			// Fractional seconds are truncated. YouTube durations are whole seconds in practice.
			for i+1 < len(rest) && rest[i+1] >= '0' && rest[i+1] <= '9' {
				i++
			}
			continue
		}
		switch c {
		case 'H':
			hours = n
		case 'M':
			mins = n
		case 'S':
			secs = n
		default:
			return 0, fmt.Errorf("invalid duration %q", iso)
		}
		sawUnit = true
		n = 0
	}
	if !sawUnit || n != 0 {
		return 0, fmt.Errorf("invalid duration %q", iso)
	}
	return hours*3600 + mins*60 + secs, nil
}
