package youtube

import "testing"

func TestParseISODuration(t *testing.T) {
	cases := []struct {
		in   string
		want int
	}{
		{"PT1H2M3S", 3723},
		{"PT1M30S", 90},
		{"PT45S", 45},
		{"PT1H", 3600},
		{"PT2M", 120},
		{"PT1.5S", 1},
	}
	for _, tc := range cases {
		got, err := ParseISODuration(tc.in)
		if err != nil {
			t.Fatalf("ParseISODuration(%q) error: %v", tc.in, err)
		}
		if got != tc.want {
			t.Fatalf("ParseISODuration(%q) = %d, want %d", tc.in, got, tc.want)
		}
	}

	for _, bad := range []string{"", "P1D", "PT", "1M30S", "PT1X"} {
		if _, err := ParseISODuration(bad); err == nil {
			t.Fatalf("ParseISODuration(%q) expected error", bad)
		}
	}
}
